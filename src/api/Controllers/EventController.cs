namespace Api.Controllers;
using Microsoft.Extensions.Logging;
[Route("api/events")]
[ApiController]
public class EventController : ControllerBase
{
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
        return mapper.Map<IEnumerable<DtoEvent>>(await eventRepository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DtoEvent>> GetByID(long id)
    {
        if (!await eventRepository.ExistsAsync(id))
            return NotFound("Event id does not exist");

        logger.LogInformation($"Getting event by id: {id}");
        return mapper.Map<DtoEvent>(await eventRepository.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<ActionResult<DtoEvent>> Add([FromBody] DtoEvent dtoEvent)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());
        if (dtoEvent.ID != 0)
            return BadRequest("Cannot add event with a valid id");

        var @event = mapper.Map<Event>(dtoEvent);
        var newEvent = await eventRepository.AddAsync(@event);

        logger.LogInformation($"Adding event: {newEvent.ID}");
        return mapper.Map<DtoEvent>(newEvent);
    }

    [HttpPut()]
    public async Task<IActionResult> Edit([FromBody] DtoEvent dtoEvent)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var e = mapper.Map<Event>(dtoEvent);
        await eventRepository.EditAsync(e);

        logger.LogInformation($"Editing event: {e.ID}");
        return Ok("Event edit was successful");
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        if (!await eventRepository.ExistsAsync(id))
            return NotFound("Event id does not exist");
        
        logger.LogInformation($"Deleting event: {id}");
        await eventRepository.DeleteAsync(id);
        return Ok();
    }
}
