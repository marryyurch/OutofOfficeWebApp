using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;
using System.Runtime.CompilerServices;

namespace OutofOfficeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly OutofOfficeDBContext _outofOfficeDbContext;
        public EmployeesController(OutofOfficeDBContext outofOfficeDBContext)
        {
            _outofOfficeDbContext = outofOfficeDBContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            _outofOfficeDbContext.Employees.Add(employee);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _outofOfficeDbContext.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); }

            _outofOfficeDbContext.Employees.Remove(employee);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}