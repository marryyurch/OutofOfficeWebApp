using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeAPI.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public ProjectType ProjectType { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        [Required]
        [ForeignKey("Employee")]
        // Single choice from the “Employee” table with “Project Manager” position
        public int ProjectManager { get; set; }

        public string? Comment { get; set; }

        [Required]
        public StatusType StatusType { get; set; }
    }

    public enum ProjectType
    {
        Research = 1,
        Development = 2,
        Testing = 3
    }
}
