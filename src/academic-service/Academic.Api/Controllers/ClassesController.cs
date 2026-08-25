using Academic.Application.DTOs;
using Academic.Application.Queries.GetClasses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Academic.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ClassesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ClassesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all classes and their sections
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<ClassResponse>>> GetClasses(CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetClassesQuery(), cancellationToken);
        return Ok(result);
    }
}
