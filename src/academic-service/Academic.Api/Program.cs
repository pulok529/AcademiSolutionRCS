using Academic.Application;
using Academic.Infrastructure;
using Academic.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog Logging
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

// Add Clean Architecture Services
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Health Checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AcademicDbContext>();

// CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

// Auto-migrate / seed database on startup in development
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AcademicDbContext>();
    db.Database.EnsureCreated();

    // Seed default classes if empty
    if (!db.Classes.Any())
    {
        var classOne = new Academic.Domain.Entities.Class { ClassName = "Class 1", Code = "C1", OrderNo = 1 };
        classOne.Sections.Add(new Academic.Domain.Entities.Section { SectionName = "A", Capacity = 40 });
        classOne.Sections.Add(new Academic.Domain.Entities.Section { SectionName = "B", Capacity = 40 });

        var classTwo = new Academic.Domain.Entities.Class { ClassName = "Class 2", Code = "C2", OrderNo = 2 };
        classTwo.Sections.Add(new Academic.Domain.Entities.Section { SectionName = "A", Capacity = 40 });

        db.Classes.AddRange(classOne, classTwo);
        db.SaveChanges();
    }
}

app.Run();
