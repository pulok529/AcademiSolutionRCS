using Academic.Application.Common.Interfaces;
using Academic.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Academic.Infrastructure.Persistence;

public class AcademicDbContext : DbContext, IAcademicDbContext
{
    public AcademicDbContext(DbContextOptions<AcademicDbContext> options) : base(options) { }

    public DbSet<Student> Students => Set<Student>();
    public DbSet<Class> Classes => Set<Class>();
    public DbSet<Section> Sections => Set<Section>();
    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Student
        modelBuilder.Entity<Student>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.StudentCode).HasMaxLength(50).IsRequired();
            builder.HasIndex(x => x.StudentCode).IsUnique();
            builder.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
            builder.Property(x => x.LastName).HasMaxLength(100).IsRequired();
            builder.Property(x => x.ContactNo).HasMaxLength(20);
        });

        // Class
        modelBuilder.Entity<Class>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.ClassName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Code).HasMaxLength(20).IsRequired();
        });

        // Section
        modelBuilder.Entity<Section>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.SectionName).HasMaxLength(20).IsRequired();
            builder.HasOne(x => x.Class)
                   .WithMany(x => x.Sections)
                   .HasForeignKey(x => x.ClassId)
                   .OnDelete(DeleteBehavior.Cascade);
        });

        // Subject
        modelBuilder.Entity<Subject>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.SubjectCode).HasMaxLength(20).IsRequired();
            builder.Property(x => x.SubjectName).HasMaxLength(100).IsRequired();
            builder.HasOne(x => x.Class)
                   .WithMany(x => x.Subjects)
                   .HasForeignKey(x => x.ClassId)
                   .OnDelete(DeleteBehavior.Cascade);
        });

        // Enrollment
        modelBuilder.Entity<Enrollment>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Student)
                   .WithMany(x => x.Enrollments)
                   .HasForeignKey(x => x.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Class)
                   .WithMany(x => x.Enrollments)
                   .HasForeignKey(x => x.ClassId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Section)
                   .WithMany(x => x.Enrollments)
                   .HasForeignKey(x => x.SectionId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => new { x.ClassId, x.SectionId, x.AcademicYear, x.RollNo }).IsUnique();
        });
    }
}
