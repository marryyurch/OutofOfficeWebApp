using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Contracts
{
    public record AddProjectRequest(int Id, ProjectType Type, DateOnly Start, 
        DateOnly End, int PM, string? Comment, StatusType Status);
}
