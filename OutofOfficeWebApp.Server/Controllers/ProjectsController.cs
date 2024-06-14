using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;

namespace OutofOfficeAPI.Controllers
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

        [HttpPost]
        public async Task<IActionResult> AddProject(Project project)
        {
            _outofOfficeDbContext.Projects.Add(project);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(project);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProjects(int id)
        {
            var project = await _outofOfficeDbContext.Projects.FindAsync(id);
            if (project == null) { return NotFound(); }

            _outofOfficeDbContext.Projects.Remove(project);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}