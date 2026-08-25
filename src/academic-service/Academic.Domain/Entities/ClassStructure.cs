namespace Academic.Domain.Entities;

public class Class
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ClassName { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public int OrderNo { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<Section> Sections { get; set; } = new List<Section>();
    public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}

public class Section
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ClassId { get; set; }
    public string SectionName { get; set; } = string.Empty;
    public int Capacity { get; set; } = 40;
    public bool IsActive { get; set; } = true;

    // Navigation
    public Class Class { get; set; } = null!;
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}

public class Subject
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ClassId { get; set; }
    public string SubjectCode { get; set; } = string.Empty;
    public string SubjectName { get; set; } = string.Empty;
    public decimal FullMark { get; set; } = 100;
    public decimal PassMark { get; set; } = 33;
    public bool IsCompulsory { get; set; } = true;

    // Navigation
    public Class Class { get; set; } = null!;
}
