namespace OutofOfficeWebApp.Server.Models
{
    public class ProjectMember
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public int ProjectId { get; set; }

        public Employee Employee { get; set; }

        public Project Project { get; set; }
    }
}
