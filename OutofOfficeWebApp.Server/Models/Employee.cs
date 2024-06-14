using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public SubdivisionType SubdivisionType { get; set; }

        [Required]
        public PositionType PositionType { get; set; }

        [Required]
        public RequestStatusType StatusType { get; set; }

        [Required]
        [ForeignKey("Employee")]
        //INT FK Single choice from the “Employee” table with “HR Manager” position
        public int PeoplePartner { get; set; }

        [Required]
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