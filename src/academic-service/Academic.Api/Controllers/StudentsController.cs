using Academic.Application.Commands.CreateStudent;
using Academic.Application.DTOs;
using Academic.Application.Queries.GetStudents;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Academic.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public StudentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Search and filter enrolled students with pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<PagedResponse<StudentResponse>>> GetStudents(
        [FromQuery] string? search,
        [FromQuery] Guid? classId,
        [FromQuery] Guid? sectionId,
        [FromQuery] int? academicYear,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var query = new GetStudentsQuery(search, classId, sectionId, academicYear, page, pageSize);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Enroll a new student
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<StudentResponse>> CreateStudent(
        [FromBody] CreateStudentRequest request,
        CancellationToken cancellationToken = default)
    {
        var command = new CreateStudentCommand(request);
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetStudents), new { id = result.Id }, result);
    }
}
