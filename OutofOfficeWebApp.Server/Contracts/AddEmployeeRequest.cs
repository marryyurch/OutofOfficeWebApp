using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Contracts
{
    public record AddEmployeeRequest(int Id, string FullName, SubdivisionType Division, 
        PositionType Position, StatusType Status, int partner);
}
