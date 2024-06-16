using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OutofOfficeWebApp.Server.Contracts;
using OutofOfficeWebApp.Server.Data;
using OutofOfficeWebApp.Server.Models;
using System.Linq.Expressions;

namespace OutofOfficeWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly OutofOfficeDBContext _outofOfficeDbContext;

        public ProjectsController(OutofOfficeDBContext outofOfficeDBContext)
        {
            _outofOfficeDbContext = outofOfficeDBContext;
        }

        [HttpPost("add-project")]
        public async Task<IActionResult> AddProject([FromBody] AddProjectRequest request)
        {
            Project newProject = new Project()
            {
                Id = request.Id,
                ProjectType = request.Type,
                StartDate = request.Start,
                EndDate = request.End,
                ProjectManager = request.PM,
                Comment = request.Comment,
                StatusType = request.Status
            };

            _outofOfficeDbContext.Projects.Add(newProject);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(newProject);
        }

        [HttpDelete("delete-project")]
        public async Task<IActionResult> DeleteProject([FromQuery] int id)
        {
            var project = await _outofOfficeDbContext.Projects.FindAsync(id);
            if (project == null) { return NotFound(); }

            _outofOfficeDbContext.Projects.Remove(project);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetProject([FromQuery] string? search, string? sortItem, string? sortOrder)
        {
            var projectsQuery = _outofOfficeDbContext.Projects
                .Where(p => string.IsNullOrWhiteSpace(search) ||
                p.Id == int.Parse(search));

            Expression<Func<Project, object>> selectorKey = sortItem?.ToLower() switch
            {
                "type" => project => project.ProjectType,
                "start" => project => project.StartDate,
                "end" => project => project.EndDate,
                "pm" => project => project.ProjectManager,
                "status" => project => project.StatusType,
                _ => project => project.Id
            };

            projectsQuery = sortOrder == "desc"
                ? projectsQuery.OrderByDescending(selectorKey)
                : projectsQuery.OrderBy(selectorKey);

            return Ok(await projectsQuery.ToListAsync());
        }

        [HttpGet("filter-project")]
        public async Task<IActionResult> FilterProject([FromQuery] string filterItem, string itemContent)
        {
            var projectQuery = _outofOfficeDbContext.Projects;

            await projectQuery.ToListAsync();

            var projects = filterItem.ToLower() switch
            {
                "type" => projectQuery.Where(p => (int)p.ProjectType == int.Parse(itemContent)),
                "pm" => projectQuery.Where(p => p.ProjectManager == int.Parse(itemContent)),
                "status" => projectQuery.Where(p => (int)p.StatusType == int.Parse(itemContent)),
                _ => projectQuery
            };

            return Ok(projects);
        }

        [HttpPost("update-project")]
        public async Task<IActionResult> UpdateProject([FromBody] AddProjectRequest request)
        {
            var project = await _outofOfficeDbContext.Projects.FindAsync(request.Id);

            if (project == null) { BadRequest("project not found"); }

            var newProject = new Project()
            {
                Id = request.Id,
                ProjectType = request.Type,
                StartDate = request.Start,
                EndDate = request.End,
                ProjectManager = request.PM,
                Comment = request.Comment,
                StatusType = request.Status
            };

            _outofOfficeDbContext.Projects.Remove(project);

            await _outofOfficeDbContext.Projects.AddAsync(newProject);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }
    }
}