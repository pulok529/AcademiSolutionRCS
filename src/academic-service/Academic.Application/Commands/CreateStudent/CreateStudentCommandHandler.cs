using Academic.Application.Common.Interfaces;
using Academic.Application.DTOs;
using Academic.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Academic.Application.Commands.CreateStudent;

public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand, StudentResponse>
{
    private readonly IAcademicDbContext _context;

    public CreateStudentCommandHandler(IAcademicDbContext context)
    {
        _context = context;
    }

    public async Task<StudentResponse> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        var student = new Student
        {
            StudentCode = req.StudentCode,
            FirstName = req.FirstName,
            LastName = req.LastName,
            Gender = req.Gender,
            DateOfBirth = req.DateOfBirth,
            FatherName = req.FatherName,
            MotherName = req.MotherName,
            ContactNo = req.ContactNo,
            Address = req.Address,
            AdmissionDate = DateTime.UtcNow
        };

        var enrollment = new Enrollment
        {
            StudentId = student.Id,
            ClassId = req.ClassId,
            SectionId = req.SectionId,
            Shift = req.Shift,
            AcademicYear = req.AcademicYear,
            RollNo = req.RollNo
        };

        _context.Students.Add(student);
        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync(cancellationToken);

        var cls = await _context.Classes.FindAsync(new object[] { req.ClassId }, cancellationToken);
        var sec = await _context.Sections.FindAsync(new object[] { req.SectionId }, cancellationToken);

        return new StudentResponse(
            student.Id,
            student.StudentCode,
            student.FirstName,
            student.LastName,
            student.Gender.ToString(),
            student.DateOfBirth,
            student.FatherName,
            student.MotherName,
            student.ContactNo,
            student.Address,
            student.PhotoPath,
            student.AdmissionDate,
            student.IsActive,
            req.ClassId,
            cls?.ClassName,
            req.SectionId,
            sec?.SectionName,
            req.RollNo,
            req.AcademicYear
        );
    }
}
