using Academic.Application.Common.Interfaces;
using Academic.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Academic.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? "Server=localhost,1433;Database=academic_db;User Id=sa;Password=YourPassword123!;TrustServerCertificate=True;";

        services.AddDbContext<AcademicDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(AcademicDbContext).Assembly.FullName)));

        services.AddScoped<IAcademicDbContext>(provider => provider.GetRequiredService<AcademicDbContext>());

        return services;
    }
}
