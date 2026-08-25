using Academic.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Academic.Application.Common.Interfaces;

public interface IAcademicDbContext
{
    DbSet<Student> Students { get; }
    DbSet<Class> Classes { get; }
    DbSet<Section> Sections { get; }
    DbSet<Subject> Subjects { get; }
    DbSet<Enrollment> Enrollments { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
