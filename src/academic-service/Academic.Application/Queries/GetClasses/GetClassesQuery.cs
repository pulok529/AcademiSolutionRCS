using Academic.Application.Common.Interfaces;
using Academic.Application.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Academic.Application.Queries.GetClasses;

public record GetClassesQuery : IRequest<List<ClassResponse>>;

public class GetClassesQueryHandler : IRequestHandler<GetClassesQuery, List<ClassResponse>>
{
    private readonly IAcademicDbContext _context;

    public GetClassesQueryHandler(IAcademicDbContext context)
    {
        _context = context;
    }

    public async Task<List<ClassResponse>> Handle(GetClassesQuery request, CancellationToken cancellationToken)
    {
        var classes = await _context.Classes
            .Include(c => c.Sections)
            .AsNoTracking()
            .OrderBy(c => c.OrderNo)
            .ToListAsync(cancellationToken);

        return classes.Select(c => new ClassResponse(
            c.Id,
            c.ClassName,
            c.Code,
            c.OrderNo,
            c.Sections.Select(s => new SectionResponse(s.Id, s.SectionName, s.Capacity)).ToList()
        )).ToList();
    }
}
