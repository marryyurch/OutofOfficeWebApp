using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public AbsenceReasonType AbsenceReasonType { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public string? Comment { get; set; }

        public RequestStatusType RequestStatusType { get; set; }
        // Single choice from the “Status” list. It is updated based on clicking the
        // Submit/Cancel button and by the result of the Approval Request.The default value is New

        public Employee Employee { get; set; }
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
