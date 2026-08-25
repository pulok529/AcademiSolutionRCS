using Academic.Application.Common.Interfaces;
using Academic.Application.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Academic.Application.Queries.GetStudents;

public record GetStudentsQuery(
    string? Search = null,
    Guid? ClassId = null,
    Guid? SectionId = null,
    int? AcademicYear = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<PagedResponse<StudentResponse>>;

public class GetStudentsQueryHandler : IRequestHandler<GetStudentsQuery, PagedResponse<StudentResponse>>
{
    private readonly IAcademicDbContext _context;

    public GetStudentsQueryHandler(IAcademicDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResponse<StudentResponse>> Handle(GetStudentsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Students
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Class)
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Section)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLower();
            query = query.Where(s =>
                s.FirstName.ToLower().Contains(search) ||
                s.LastName.ToLower().Contains(search) ||
                s.StudentCode.ToLower().Contains(search) ||
                s.ContactNo.Contains(search));
        }

        if (request.ClassId.HasValue)
        {
            query = query.Where(s => s.Enrollments.Any(e => e.ClassId == request.ClassId.Value));
        }

        if (request.SectionId.HasValue)
        {
            query = query.Where(s => s.Enrollments.Any(e => e.SectionId == request.SectionId.Value));
        }

        if (request.AcademicYear.HasValue)
        {
            query = query.Where(s => s.Enrollments.Any(e => e.AcademicYear == request.AcademicYear.Value));
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var students = await query
            .OrderByDescending(s => s.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var items = students.Select(s =>
        {
            var activeEnrollment = s.Enrollments.FirstOrDefault();
            return new StudentResponse(
                s.Id,
                s.StudentCode,
                s.FirstName,
                s.LastName,
                s.Gender.ToString(),
                s.DateOfBirth,
                s.FatherName,
                s.MotherName,
                s.ContactNo,
                s.Address,
                s.PhotoPath,
                s.AdmissionDate,
                s.IsActive,
                activeEnrollment?.ClassId,
                activeEnrollment?.Class?.ClassName,
                activeEnrollment?.SectionId,
                activeEnrollment?.Section?.SectionName,
                activeEnrollment?.RollNo,
                activeEnrollment?.AcademicYear
            );
        }).ToList();

        return new PagedResponse<StudentResponse>(items, totalCount, request.Page, request.PageSize);
    }
}
