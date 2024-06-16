using OutofOfficeWebApp.Server.Enums;

namespace OutofOfficeWebApp.Server.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public SubdivisionType SubdivisionType { get; set; }

        public PositionType PositionType { get; set; }

        public StatusType StatusType { get; set; }

        public int PeoplePartner { get; set; }

        public float OutofOfficeBalance { get; set; }

        public string? Photo { get; set; } //type - files
    }
}