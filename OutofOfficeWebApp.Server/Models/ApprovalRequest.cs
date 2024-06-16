using System.ComponentModel.DataAnnotations.Schema;
using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Models
{
    public class ApprovalRequest
    {
        public int Id { get; set; }

        public int Approver { get; set; } // HR

        public int LeaveRequestId { get; set; }

        public RequestStatusType RequestStatusType { get; set; }

        public string? Comment { get; set; }

        [ForeignKey("Approver")]
        public Employee Employee { get; set; }

        public LeaveRequest LeaveRequest { get; set; }
    }
}