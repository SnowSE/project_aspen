﻿using Serilog;

namespace Api.Controllers;

[Route("api/events")]
[ApiController]
public class EventController : ControllerBase
{
    public const string AspenAdminRole = "admin-aspen";
    private readonly IEventRepository eventRepository;
    private readonly IMapper mapper;
    private readonly ILogger<EventController> logger;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public EventController(IEventRepository eventRepository, IMapper mapper, ILogger<EventController> logger)
    {
        this.eventRepository = eventRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<DtoEvent>> GetAll()
    {
        logger.LogInformation("Getting all events");
        return mapper.Map<IEnumerable<DtoEvent>>(await eventRepository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoEvent>> GetByID(long id)
    {
        if (!await eventRepository.ExistsAsync(id))
        {
            Log.Logger.Error("Events: Event ID does not exist");
            return NotFound("Event id does not exist");
        }

        return mapper.Map<DtoEvent>(await eventRepository.GetByIdAsync(id));
    }

    [HttpPost, Authorize(Roles = AspenAdminRole)]
    public async Task<ActionResult<DtoEvent>> Add([FromBody] DtoEvent dtoEvent)
    {
        if (!ModelState.IsValid)
        {
            Log.Logger.Error("Events: Event is not valid");
            return BadRequest(getModelStateErrorMessage());
        }
        if (dtoEvent.ID != 0)
        {
            Log.Logger.Error("Events: cannot add event with a valid id");
            return BadRequest("Cannot add event with a valid id");
        }

        var @event = mapper.Map<Event>(dtoEvent);
        var newEvent = await eventRepository.AddAsync(@event);
        Log.Logger.Information("Events: a new event has been added");
        return mapper.Map<DtoEvent>(newEvent);
    }

    [HttpPut(), Authorize(Roles = AspenAdminRole)]
    public async Task<IActionResult> Edit([FromBody] DtoEvent dtoEvent)
    {
        if (!ModelState.IsValid)
        {
            Log.Logger.Error("Events: cannot get event");
            return BadRequest(getModelStateErrorMessage());
        }

        var e = mapper.Map<Event>(dtoEvent);
        await eventRepository.EditAsync(e);
        return Ok("Event edit was successful");
    }


    [HttpDelete("{id}"), Authorize(Roles = AspenAdminRole)]
    public async Task<IActionResult> Delete(long id)
    {
        if (!await eventRepository.ExistsAsync(id))
        {
            Log.Logger.Error("Events: event does not exist");
            return NotFound("Event id does not exist");
        }

        await eventRepository.DeleteAsync(id);
        return Ok();
    }
}
