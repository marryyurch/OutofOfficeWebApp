using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class LeaveRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        [Required]
        public AbsenceReasonType AbsenceReasonType { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        public string? Comment { get; set; }

        [Required]
        public RequestStatusType RequestStatusType { get; set; }
        // Single choice from the “Status” list. It is updated based on clicking the
        // Submit/Cancel button and by the result of the Approval Request.The default value is New
    }
    // enums coef edit if needed
    public enum AbsenceReasonType
    {
        Vacation = 0,
        SickLeave = 1,
        UnpaidLeave = 2,
        Other = 3
    }

    public enum RequestStatusType
    {
        New = 0,
        Approved = 1,
        Rejected = 2,
        Canceled = 3,
        Pending = 4
    }
}
