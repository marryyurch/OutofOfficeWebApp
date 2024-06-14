using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace OutofOfficeAPI.Models
{
    public class ApprovalRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Employee")]
        public int Approver { get; set; }

        [Required]
        [ForeignKey("LeaveRequest")]
        public int LeaveRequest { get; set; }

        [Required]
        public RequestStatusType RequestStatusType { get; set; }
        //Single choice from the “Status” list. Is updated upon clicking Approve/Reject
        //Request.The default value is New.

        // drop all enums to separate folder

        public string? Comment { get; set; }
    }
}