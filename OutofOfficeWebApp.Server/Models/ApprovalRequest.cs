using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace OutofOfficeAPI.Models
{
    public class ApprovalRequest
    {
        public int Id { get; set; }

        public int Approver { get; set; }

        public int LeaveRequestId { get; set; }

        public RequestStatusType RequestStatusType { get; set; }
        //Single choice from the “Status” list. Is updated upon clicking Approve/Reject
        //Request.The default value is New.

        // drop all enums to separate folder

        public string? Comment { get; set; }

        [ForeignKey("Approver")]
        public Employee Employee { get; set; }

        public LeaveRequest LeaveRequest { get; set; }
    }
}