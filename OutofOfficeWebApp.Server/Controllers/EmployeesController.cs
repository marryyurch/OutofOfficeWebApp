using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;
using System.Linq.Expressions;

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

        [HttpPost("add-emplpoyee")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            _outofOfficeDbContext.Employees.Add(employee);
            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete("delete-employee")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _outofOfficeDbContext.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); }

            _outofOfficeDbContext.Employees.Remove(employee);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployee([FromQuery]string? search, string? sortItem, string? sortOrder)
        {
            var employeesQuery = _outofOfficeDbContext.Employees
                .Where(e => string.IsNullOrWhiteSpace(search) ||
                e.FullName.ToLower().Contains(search.ToLower()));

            Expression<Func<Employee, object>> selectorKey = sortItem?.ToLower() switch
            {
                "name" => employee => employee.FullName,
                "subdivision" => employee => employee.SubdivisionType,
                "position" => employee => employee.PositionType,
                "status" => employee => employee.StatusType,
                "ppartner" => employee => employee.PeoplePartner,
                "ooobalance" => employee => employee.OutofOfficeBalance,
                _ => employee => employee.Id
            };

            employeesQuery = sortOrder == "desc"
                ? employeesQuery.OrderByDescending(selectorKey)
                : employeesQuery.OrderBy(selectorKey);

            return Ok(await employeesQuery.ToListAsync());
        }

        [HttpGet("filter-employee")]
        public async Task<IActionResult> FilterEmployee(string filterItem, string itemContent)
        {
            var employeesQuery = _outofOfficeDbContext.Employees;

            var employees = filterItem.ToLower() switch
            {
                "name" => employeesQuery.Where(e => e.FullName == itemContent),
                "subdivision" => employeesQuery.Where(e => (int)e.SubdivisionType == int.Parse(itemContent)),
                "position" => employeesQuery.Where(e => (int)e.PositionType == int.Parse(itemContent)),
                "status" => employeesQuery.Where(e => (int)e.StatusType == int.Parse(itemContent)),
                "ppartner" => employeesQuery.Where(e => e.PeoplePartner == int.Parse(itemContent)),
                _ => employeesQuery
            };

            return Ok(employees);
        }

        [HttpPost("update-employee")]
        public async Task<IActionResult> UpdateEmployee(Employee employee)
        {
            //update and deactivate

            var employeesQuery = _outofOfficeDbContext.Employees;

            employeesQuery.Remove(employeesQuery.Where(e => e.Id == employee.Id).First());

            employeesQuery.Add(employee);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }
    }
}