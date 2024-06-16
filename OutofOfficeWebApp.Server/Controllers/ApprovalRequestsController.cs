using OutofOfficeWebApp.Server.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OutofOfficeWebApp.Server.Data;
using OutofOfficeWebApp.Server.Models;
using OutofOfficeWebApp.Server.Contracts;
using System.Linq.Expressions;

namespace OutofOfficeWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovalRequestsController : ControllerBase
    {
        private readonly OutofOfficeDBContext _outofOfficeDbContext;

        public ApprovalRequestsController(OutofOfficeDBContext outofOfficeDBContext)
        {
            _outofOfficeDbContext = outofOfficeDBContext;
        }

        [HttpPost("add-approval-request")]
        public async Task<IActionResult> AddApprovalRequest([FromBody] CreateApprovalRequest request)
        {
            ApprovalRequest newRequest = new ApprovalRequest()
            {
                Id = request.Id,
                Approver = request.Approver,
                LeaveRequestId = request.LeaveRequest,
                RequestStatusType = request.Status,
                Comment = request.Comment
            };
            _outofOfficeDbContext.ApprovalRequests.Add(newRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(newRequest);
        }

        [HttpDelete("delete-approval-request")]
        public async Task<IActionResult> DeleteApprovalRequest([FromQuery] int id)
        {
            var approvalRequest = await _outofOfficeDbContext.ApprovalRequests.FindAsync(id);
            if (approvalRequest == null) { return NotFound(); }

            _outofOfficeDbContext.ApprovalRequests.Remove(approvalRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetApplovalRequest([FromQuery] string? search, string? sortItem, string? sortOrder)
        {
            var requestQuery = _outofOfficeDbContext.ApprovalRequests
                .Where(r => string.IsNullOrWhiteSpace(search) ||
                r.Id == int.Parse(search));

            Expression<Func<ApprovalRequest, object>> selectorKey = sortItem?.ToLower() switch
            {
                "approver" => requestQuery => requestQuery.Approver,
                "leaverequest" => requestQuery => requestQuery.LeaveRequest,
                "status" => requestQuery => requestQuery.RequestStatusType,
                _ => requestQuery => requestQuery.Id
            };

            requestQuery = sortOrder == "desc"
                ? requestQuery.OrderByDescending(selectorKey)
                : requestQuery.OrderBy(selectorKey);

            return Ok(await requestQuery.ToListAsync());
        }

        [HttpGet("filter-approval-request")]
        public async Task<IActionResult> FilterApprovalRequest([FromQuery] string filterItem, string itemContent)
        {
            var requestQuery = _outofOfficeDbContext.ApprovalRequests;

            await requestQuery.ToListAsync();

            var requests = filterItem.ToLower() switch
            {
                "approver" => requestQuery.Where(r => r.Approver == int.Parse(itemContent)),
                "leaverequest" => requestQuery.Where(r => r.LeaveRequestId == int.Parse(itemContent)),
                "status" => requestQuery.Where(r => (int)r.RequestStatusType == int.Parse(itemContent)),
                "comment" => requestQuery.Where(r => r.Comment.Contains(itemContent)),
                _ => requestQuery
            };

            return Ok(requests);
        }

        [HttpPost("approve-request")]
        public async Task<IActionResult> ApproveRequest([FromQuery] int requestId)
        {
            var approveRequest = _outofOfficeDbContext.ApprovalRequests
                .Where(r => r.Id == requestId).First();

            var leaveRequest = _outofOfficeDbContext.LeaveRequests
                .Where(r => r.Id == approveRequest.LeaveRequestId)
                .First();

            leaveRequest.RequestStatusType = RequestStatusType.Approved;

            var updatedApproverAbsBalance = _outofOfficeDbContext.Employees
                .Where(a => a.Id == approveRequest.Approver)
                .First().OutofOfficeBalance = leaveRequest.EndDate.DayNumber - leaveRequest.StartDate.DayNumber;

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }

        [HttpPost("reject-request")]
        public async Task<IActionResult> RejectRequest([FromQuery] int requestId, string? comment)
        {
            var approveRequest = _outofOfficeDbContext.ApprovalRequests
                .Where(r => r.Id == requestId).First();

            var leaveRequest = _outofOfficeDbContext.LeaveRequests
                .Where(r => r.Id == approveRequest.LeaveRequestId)
                .First();

            leaveRequest.RequestStatusType = RequestStatusType.Rejected;

            leaveRequest.Comment = string.IsNullOrWhiteSpace(comment) ? "no comment" : comment;

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}