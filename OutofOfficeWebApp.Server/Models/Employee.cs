using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public SubdivisionType SubdivisionType { get; set; }

        public PositionType PositionType { get; set; }

        public RequestStatusType StatusType { get; set; }

        //INT FK Single choice from the “Employee” table with “HR Manager” position
        public int PeoplePartner { get; set; }

        public float OutofOfficeBalance { get; set; }

        public string? Photo { get; set; } //type - files

    }
    // enums coef edit if needed
    public enum SubdivisionType
    {
        Marketing = 0,
        Sales = 1,
        HR = 2,
        Development = 3,
        Support = 4
    }

    public enum PositionType
    {
        Manager = 0,
        Analyst = 1,
        Tester = 2,
        Designer = 3,
        Developer = 4
    }

    public enum StatusType
    {
        Inactive = 0,
        Active,
    }
}