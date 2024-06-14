using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;

namespace OutofOfficeAPI.Controllers
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

        [HttpPost]
        public async Task<IActionResult> AddApprovalRequest(ApprovalRequest approvalRequest)
        {
            _outofOfficeDbContext.ApprovalRequests.Add(approvalRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(approvalRequest);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteApprovalRequest(int id)
        {
            var approvalRequest = await _outofOfficeDbContext.ApprovalRequests.FindAsync(id);
            if (approvalRequest == null) { return NotFound(); }

            _outofOfficeDbContext.ApprovalRequests.Remove(approvalRequest);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}