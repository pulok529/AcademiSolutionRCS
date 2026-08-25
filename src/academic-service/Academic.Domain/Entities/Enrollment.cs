using Academic.Domain.Enums;

namespace Academic.Domain.Entities;

public class Enrollment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid StudentId { get; set; }
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public Shift Shift { get; set; } = Shift.Morning;
    public int AcademicYear { get; set; }
    public int RollNo { get; set; }
    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Active;
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Student Student { get; set; } = null!;
    public Class Class { get; set; } = null!;
    public Section Section { get; set; } = null!;
}
