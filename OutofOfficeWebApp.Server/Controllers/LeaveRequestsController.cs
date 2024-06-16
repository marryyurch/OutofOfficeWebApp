using Microsoft.AspNetCore.Mvc;
using OutofOfficeWebApp.Server.Data;
using OutofOfficeWebApp.Server.Contracts;
using OutofOfficeWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly OutofOfficeDBContext _outofOfficeDbContext;

        public LeaveRequestsController(OutofOfficeDBContext outofOfficeDBContext)
        {
            _outofOfficeDbContext = outofOfficeDBContext;
        }

        [HttpPost("add-leave-request")]
        public async Task<IActionResult> AddLeaveRequest([FromBody] CreateLeaveRequest request)
        {
            var leaveRequest = new LeaveRequest()
            {
                Id = request.Id,
                EmployeeId = request.EmployeeId,
                AbsenceReasonType = request.AbsenceReasonType,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Comment = request.Comment,
                RequestStatusType = request.RequestStatusType
            };

            _outofOfficeDbContext.LeaveRequests.Add(leaveRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(leaveRequest);
        }

        [HttpDelete("delete-leave-reuest")]
        public async Task<IActionResult> DeleteLeaveRequest([FromQuery] int id)
        {
            var leaveRequest = await _outofOfficeDbContext.LeaveRequests.FindAsync(id);
            if (leaveRequest == null) { return NotFound(); }

            _outofOfficeDbContext.LeaveRequests.Remove(leaveRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetLeaveRequests([FromQuery]string? search, string? sortItem, string? sortOrder)
        {
            var requestQuery = _outofOfficeDbContext.LeaveRequests
                .Where(r => string.IsNullOrWhiteSpace(search) ||
                r.Id == int.Parse(search));

            Expression<Func<LeaveRequest, object>> selectorKey = sortItem?.ToLower() switch
            {
                "employee" => requestQuery => requestQuery.EmployeeId,
                "reason" => requestQuery => requestQuery.AbsenceReasonType,
                "start" => requestQuery => requestQuery.StartDate,
                "end" => requestQuery => requestQuery.EndDate,
                "status" => requestQuery => requestQuery.RequestStatusType,
                _ => requestQuery => requestQuery.Id
            };

            requestQuery = sortOrder == "desc"
                ? requestQuery.OrderByDescending(selectorKey)
                : requestQuery.OrderBy(selectorKey);

            return Ok(await requestQuery.ToListAsync());
        }

        [HttpGet("filter-leave-request")]
        public async Task<IActionResult> FilterLeaveRequest([FromQuery] string filterItem, string itemContent)
        {
            var requestQuery = _outofOfficeDbContext.LeaveRequests;

            await requestQuery.ToListAsync();

            var requests = filterItem.ToLower() switch
            {
                "approver" => requestQuery.Where(r => r.EmployeeId == int.Parse(itemContent)),
                "reason" => requestQuery.Where(r => (int)r.AbsenceReasonType == int.Parse(itemContent)),
                "status" => requestQuery.Where(r => (int)r.RequestStatusType == int.Parse(itemContent)),
                "comment" => requestQuery.Where(r => r.Comment.Contains(itemContent)),
                _ => requestQuery
            };

            return Ok(requests);
        }

        [HttpPost("update-leave-request")]
        public async Task<IActionResult> UpdateEmployee([FromBody] CreateLeaveRequest request)
        {
            var oldRequest = await _outofOfficeDbContext.LeaveRequests.FindAsync(request.Id);

            if (oldRequest == null)
                return BadRequest("leave request not found");

            var newRequest = new LeaveRequest()
            {
                Id = request.Id,
                EmployeeId = request.EmployeeId,
                AbsenceReasonType = request.AbsenceReasonType,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Comment = request.Comment,
                RequestStatusType = request.RequestStatusType,
            };

            _outofOfficeDbContext.LeaveRequests.Remove(oldRequest);

            _outofOfficeDbContext.LeaveRequests.Add(newRequest);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }

        [HttpPost("submit-request")]
        public async Task<IActionResult> SubmitLeaveRequest([FromQuery] int requestId, int employeeId)
        {
            var leaveRequst = await _outofOfficeDbContext.LeaveRequests.FindAsync(requestId);

            if (leaveRequst == null)
                return BadRequest("leave request not found");
            else if (await _outofOfficeDbContext.LeaveRequests.FindAsync(employeeId) == null)
                return BadRequest("employee not found");

            leaveRequst.RequestStatusType = RequestStatusType.Submitted;

            _outofOfficeDbContext.SaveChanges();

            var approvalRequest = new ApprovalRequest()
            { 
                Approver = _outofOfficeDbContext.Employees.Find(employeeId).PeoplePartner,
                LeaveRequestId = leaveRequst.Id,
                RequestStatusType = RequestStatusType.New,
                Comment = ""
            };

            await _outofOfficeDbContext.ApprovalRequests.AddAsync(approvalRequest);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }

        [HttpPost("cancel-request")]
        public async Task<IActionResult> CancelLeaveRequest([FromQuery] int requestId)
        {
            var leaveRequst = await _outofOfficeDbContext.LeaveRequests.FindAsync(requestId);

            if (leaveRequst == null)
                return BadRequest("leave request not found");

            var approvalRequest = _outofOfficeDbContext.ApprovalRequests
                .Where(r => r.LeaveRequestId == requestId).First();

            if (approvalRequest != null)
                _outofOfficeDbContext.ApprovalRequests.Remove(approvalRequest);

            leaveRequst.RequestStatusType = RequestStatusType.Canceled;

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}