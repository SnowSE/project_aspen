using Serilog;

namespace Api.Controllers;

[Route("api/teams")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly ITeamRepository teamRepository;
    private readonly IMapper mapper;
    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public TeamController(ITeamRepository teamRepository, IMapper mapper)
    {
        this.teamRepository = teamRepository;
        this.mapper = mapper;
    }

    [HttpGet("event/{eventId}")]
    public async Task<ActionResult<IEnumerable<DtoTeam>>> GetByEventID(long eventId)
    {
        Log.Debug("HttpGet GetByEventID");
        Log.Information("Getting Team by event {eventId}", eventId);
        try
        {
            var teams = mapper.Map<IEnumerable<DtoTeam>>(await teamRepository.GetByEventIdAsync(eventId));
            return new ActionResult<IEnumerable<DtoTeam>>(teams);
        }
        catch(NotFoundException<IEnumerable<Team>> ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("{teamId}")]
    public async Task<ActionResult<DtoTeam>> GetByID(long teamId)
    {
        Log.Debug("HttpGet GetByID");
        Log.Information("Getting team by teamId {teamId}", teamId);
        if (!await teamRepository.ExistsAsync(teamId))
            return NotFound("Team id does not exist");
        return mapper.Map<DtoTeam>(await teamRepository.GetTeamByIdAsync(teamId));
    }

    [HttpPost]
    public async Task<ActionResult<DtoTeam>> Add([FromBody] DtoTeam dtoTeam)
    {
        Log.Debug("HttpPost Add dtoTeam");
        Log.Information("Adding new dtoTeam {dtoTeam}", dtoTeam);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoTeam.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var team = mapper.Map<Team>(dtoTeam);
        var newTeam = await teamRepository.AddAsync(team);
        return mapper.Map<DtoTeam>(newTeam);

    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] DtoTeam dtoTeam)
    {
        Log.Debug("HttpPut Edit dtoTeam");
        Log.Information("Editing dtoTeam {dtoTeam}", dtoTeam);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var team = mapper.Map<Team>(dtoTeam);

        if (!await teamRepository.ExistsAsync(team.ID))
            return NotFound("Team id does not exist");

        await teamRepository.EditTeamAsync(team);
        return Ok("Team edit was successful");

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        Log.Debug("HttpDelete Delete Team");
        Log.Information("Deleteting team {id}", id);
        if (!await teamRepository.ExistsAsync(id))
            return NotFound("Team id does not exist");

        try
        {
            await teamRepository.DeleteTeamAsync(id);
            return Ok();
        }
        catch(UnableToDeleteException<Team> ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
