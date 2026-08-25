using Academic.Application.DTOs;
using Academic.Domain.Entities;
using FluentValidation;
using MediatR;

namespace Academic.Application.Commands.CreateStudent;

public record CreateStudentCommand(CreateStudentRequest Request) : IRequest<StudentResponse>;

public class CreateStudentCommandValidator : AbstractValidator<CreateStudentCommand>
{
    public CreateStudentCommandValidator()
    {
        RuleFor(x => x.Request.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.StudentCode).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Request.FatherName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.ContactNo).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Request.ClassId).NotEmpty();
        RuleFor(x => x.Request.SectionId).NotEmpty();
        RuleFor(x => x.Request.AcademicYear).GreaterThan(2000);
        RuleFor(x => x.Request.RollNo).GreaterThan(0);
    }
}
