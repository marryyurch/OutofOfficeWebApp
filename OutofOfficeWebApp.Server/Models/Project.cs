using OutofOfficeWebApp.Server.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutofOfficeWebApp.Server.Models
{
    public class Project
    {
        public int Id { get; set; }

        public ProjectType ProjectType { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public int ProjectManager { get; set; }

        public string? Comment { get; set; }

        public StatusType StatusType { get; set; }

        [ForeignKey("ProjectManager")]
        public Employee Employee { get; set; }
    }
}
