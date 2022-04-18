namespace Api.Controllers;

[Route("api/events")]
[ApiController]
public class EventController : ControllerBase
{
    public const string AspenAdminRole = "admin-aspen";
    private readonly IEventRepository eventRepository;
    private readonly IMapper mapper;
    private readonly ILogger<EventController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public EventController(IEventRepository eventRepository, IMapper mapper, ILogger<EventController> log)
    {
        this.eventRepository = eventRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpGet]
    public async Task<IEnumerable<DtoEvent>> GetAll()
    {
        log.LogDebug("HttpGet({eventID})");
        log.LogInformation("Getting the total donations for events ");
        log.LogInformation("Getting all events");
        return mapper.Map<IEnumerable<DtoEvent>>(await eventRepository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoEvent>> GetByID(long id)
    {
        log.LogDebug("HttpGet({id})");
        log.LogInformation("Getting the event {id}", id);
        if (!await eventRepository.ExistsAsync(id))
            return NotFound("Event id does not exist");

        return mapper.Map<DtoEvent>(await eventRepository.GetByIdAsync(id));
    }

    [HttpPost, Authorize(Roles = AspenAdminRole)]
    public async Task<ActionResult<DtoEvent>> Add([FromBody] DtoEvent dtoEvent)
    {
        log.LogDebug("HttpPost dtoEvent");
        log.LogInformation("Adding the new dtoEvent {dtoEvent}", dtoEvent);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());
        if (dtoEvent.ID != 0)
            return BadRequest("Cannot add event with a valid id");

        var @event = mapper.Map<Event>(dtoEvent);
        var newEvent = await eventRepository.AddAsync(@event);
        return mapper.Map<DtoEvent>(newEvent);
    }

    [HttpPut(), Authorize(Roles = AspenAdminRole)]
    public async Task<IActionResult> Edit([FromBody] DtoEvent dtoEvent)
    {
        log.LogDebug("HttpPut Edit dtoEvent");
        log.LogInformation("Editing the event {dtoEvent}", dtoEvent);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var e = mapper.Map<Event>(dtoEvent);
        await eventRepository.EditAsync(e);
        return Ok("Event edit was successful");
    }


    [HttpDelete("{id}"), Authorize(Roles = AspenAdminRole)]
    public async Task<IActionResult> Delete(long id)
    {
        log.LogDebug("HttpDelete({id})");
        log.LogInformation("Deleteting event {id}", id);
        if (!await eventRepository.ExistsAsync(id))
            return NotFound("Event id does not exist");

        await eventRepository.DeleteAsync(id);
        return Ok();
    }
}
