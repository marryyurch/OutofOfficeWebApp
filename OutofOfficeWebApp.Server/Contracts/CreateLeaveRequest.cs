using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Contracts
{
    public record CreateLeaveRequest(int Id, int EmployeeId, AbsenceReasonType AbsenceReasonType, 
        DateOnly StartDate, DateOnly EndDate, string? Comment, RequestStatusType RequestStatusType);
}
