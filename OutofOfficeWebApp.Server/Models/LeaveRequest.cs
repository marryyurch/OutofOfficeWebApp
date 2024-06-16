using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Models
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

        public Employee Employee { get; set; }
    }
}
