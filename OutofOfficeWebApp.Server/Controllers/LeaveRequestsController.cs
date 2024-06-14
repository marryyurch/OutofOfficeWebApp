using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;

namespace OutofOfficeAPI.Controllers
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

        [HttpPost]
        public async Task<IActionResult> AddLeaveRequest(LeaveRequest leaveRequest)
        {
            _outofOfficeDbContext.LeaveRequests.Add(leaveRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(leaveRequest);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLeaveRequest(int id)
        {
            var leaveRequest = await _outofOfficeDbContext.LeaveRequests.FindAsync(id);
            if (leaveRequest == null) { return NotFound(); }

            _outofOfficeDbContext.LeaveRequests.Remove(leaveRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}