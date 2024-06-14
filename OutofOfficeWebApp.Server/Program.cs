using Microsoft.EntityFrameworkCore;
using OutofOfficeAPI.Data;
using OutofOfficeAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("OutofOfficeDBConnectionString");
builder.Services.AddDbContext<OutofOfficeDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<LoginUser>()
                .AddEntityFrameworkStores<OutofOfficeDBContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapIdentityApi<LoginUser>();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
