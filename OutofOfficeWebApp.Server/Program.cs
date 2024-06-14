using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using OutofOfficeAPI.Models;
using OutofOfficeAPI.Data;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("OutofOfficeDBConnectionString");
builder.Services.AddDbContext<OutofOfficeDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<LoginUser>()
                .AddEntityFrameworkStores<OutofOfficeDBContext>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapIdentityApi<LoginUser>();

app.MapPost("/logout", async (SignInManager<LoginUser> signInManager) =>
{

    await signInManager.SignOutAsync();
    return Results.Ok();

}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
    return Results.Json(new { Email = email }); ; // return the email as a plain text response
}).RequireAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
