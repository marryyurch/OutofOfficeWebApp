using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class Project
    {
        public int Id { get; set; }

        public ProjectType ProjectType { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        // Single choice from the “Employee” table with “Project Manager” position
        public int ProjectManager { get; set; }

        public string? Comment { get; set; }

        public StatusType StatusType { get; set; }

        [ForeignKey("ProjectManager")]
        public Employee Employee { get; set; }
    }

    public enum ProjectType
    {
        Research = 1,
        Development = 2,
        Testing = 3
    }
}
