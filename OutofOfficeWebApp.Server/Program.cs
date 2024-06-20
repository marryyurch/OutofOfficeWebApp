using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using OutofOfficeWebApp.Server.Models;
using OutofOfficeWebApp.Server.Data;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:5173/");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("OutofOfficeDBConnectionString");
builder.Services.AddDbContext<OutofOfficeDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<LoginIdentityUser>()
                .AddEntityFrameworkStores<OutofOfficeDBContext>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapIdentityApi<LoginIdentityUser>();

app.MapPost("/logout", async (SignInManager<LoginIdentityUser> signInManager) =>
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

app.UseCors();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
