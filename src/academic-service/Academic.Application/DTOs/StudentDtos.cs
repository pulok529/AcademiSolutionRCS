using Academic.Domain.Enums;

namespace Academic.Application.DTOs;

public record CreateStudentRequest(
    string StudentCode,
    string FirstName,
    string LastName,
    Gender Gender,
    DateTime DateOfBirth,
    string FatherName,
    string MotherName,
    string ContactNo,
    string Address,
    Guid ClassId,
    Guid SectionId,
    Shift Shift,
    int AcademicYear,
    int RollNo
);

public record StudentResponse(
    Guid Id,
    string StudentCode,
    string FirstName,
    string LastName,
    string Gender,
    DateTime DateOfBirth,
    string FatherName,
    string MotherName,
    string ContactNo,
    string Address,
    string? PhotoPath,
    DateTime AdmissionDate,
    bool IsActive,
    Guid? ClassId,
    string? ClassName,
    Guid? SectionId,
    string? SectionName,
    int? RollNo,
    int? AcademicYear
);

public record ClassResponse(
    Guid Id,
    string ClassName,
    string Code,
    int OrderNo,
    List<SectionResponse> Sections
);

public record SectionResponse(
    Guid Id,
    string SectionName,
    int Capacity
);

public record PagedResponse<T>(
    List<T> Items,
    int TotalCount,
    int Page,
    int PageSize
);
