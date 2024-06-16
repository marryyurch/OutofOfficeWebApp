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
    public class EmployeesController : ControllerBase
    {
        private readonly OutofOfficeDBContext _outofOfficeDbContext;

        public EmployeesController(OutofOfficeDBContext outofOfficeDBContext)
        {
            _outofOfficeDbContext = outofOfficeDBContext;
        }

        [HttpPost("add-emplpoyee")]
        public async Task<IActionResult> AddEmployee([FromBody] AddEmployeeRequest request)
        {
            Employee newEmployee = new Employee()
            {
                Id = request.Id,
                FullName = request.FullName,
                SubdivisionType = request.Division,
                PositionType = request.Position,
                StatusType = request.Status,
                PeoplePartner = request.partner,
                OutofOfficeBalance = 0
            };

            _outofOfficeDbContext.Employees.Add(newEmployee);

            _outofOfficeDbContext.SaveChanges();

            // in client part invoke REGISTER method
            SoftUser newUser = new SoftUser()
            {
                EmployeeId = newEmployee.Id,
                Email = string.Concat(newEmployee.FullName.ToLower().Replace(" ", ""), "@outofoffice.ua")
            };

            _outofOfficeDbContext.SoftUsers.Add(newUser);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok(newEmployee);
        }

        [HttpDelete("delete-employee")]
        public async Task<IActionResult> DeleteEmployee([FromQuery] int id)
        {
            var employee = await _outofOfficeDbContext.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); }

            _outofOfficeDbContext.Employees.Remove(employee);
            await _outofOfficeDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployee([FromQuery] string? search, string? sortItem, string? sortOrder)
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
        public async Task<IActionResult> FilterEmployee([FromQuery] string filterItem, string itemContent)
        {
            var employeesQuery = _outofOfficeDbContext.Employees;

            await employeesQuery.ToListAsync();

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
        public async Task<IActionResult> UpdateEmployee(AddEmployeeRequest request, float offBalance, string? photo)
        {
            //update and deactivate
            var employee = await _outofOfficeDbContext.Employees.FindAsync(request.Id);

            if (employee == null)
                return BadRequest("employee not found");

            var newEmployee = new Employee()
            {
                Id = request.Id,
                FullName = request.FullName,
                SubdivisionType = request.Division,
                PositionType = request.Position,
                StatusType = request.Status,
                PeoplePartner = request.partner,
                OutofOfficeBalance = offBalance,
                Photo = photo
            };

            _outofOfficeDbContext.Employees.Remove(employee);

            await _outofOfficeDbContext.Employees.AddAsync(newEmployee);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }

        [HttpPost("add-employee-to-progect")]
        public async Task<IActionResult> AddEmplToProject([FromQuery] int employeeId, int projectId)
        {
            var member = new ProjectMember()
            {
                Id = _outofOfficeDbContext.ProjectMembers.Count() + 1,
                EmployeeId = employeeId,
                ProjectId = projectId
            };

            _outofOfficeDbContext.ProjectMembers.Add(member);

            await _outofOfficeDbContext.SaveChangesAsync();

            return Ok("Done");
        }
    }
}