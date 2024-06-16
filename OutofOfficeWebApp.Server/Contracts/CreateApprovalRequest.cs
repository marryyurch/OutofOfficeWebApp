using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Contracts
{
    public record CreateApprovalRequest(int Id, int Approver, int LeaveRequest, 
        RequestStatusType Status, string? Comment);
}
