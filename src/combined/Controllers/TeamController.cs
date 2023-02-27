
namespace Api.Controllers;
using Serilog;

[Route("api/teams")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly ITeamRepository teamRepository;
    private readonly IPersonTeamAssoicationRepository personTeamAssoicationRepository;
    private readonly IMapper mapper;
    private readonly ILogger<TeamController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public TeamController(ITeamRepository teamRepository, IMapper mapper, ILogger<TeamController> log, IPersonTeamAssoicationRepository personTeamAssoicationRepository)
    {
        this.teamRepository = teamRepository;
        this.personTeamAssoicationRepository = personTeamAssoicationRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpGet("event/{eventId}")]
    public async Task<ActionResult<IEnumerable<DtoTeam>>> GetByEventID(long eventId)
    {
        Log.Information("Getting Team by event {eventId}", eventId);
        try
        {
            var teams = mapper.Map<IEnumerable<DtoTeam>>(await teamRepository.GetByEventIdAsync(eventId));
            return new ActionResult<IEnumerable<DtoTeam>>(teams);
        }
        catch (NotFoundException<IEnumerable<Team>> ex)
        {
            Log.Information(ex.Message, "Event Not Found");
            return NotFound(ex.Message);
        }
    }

    [HttpGet("{teamId}")]
    public async Task<ActionResult<DtoTeam>> GetByID(long teamId)
    {
        Log.Information("Getting team by teamId {teamId}", teamId);
        if (!await teamRepository.ExistsAsync(teamId))
        {
            Log.Information("Does not Exist");
            return NotFound("Team id does not exist");
        }
        return mapper.Map<DtoTeam>(await teamRepository.GetTeamByIdAsync(teamId));
    }

    [HttpPost]
    public async Task<ActionResult<DtoTeam>> Add([FromBody] DtoTeam dtoTeam)
    {
        log.LogInformation("Adding new dtoTeam {dtoTeam}", dtoTeam);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoTeam.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var team = mapper.Map<Team>(dtoTeam);
        var newTeam = await teamRepository.AddAsync(team);
        var personTeamAssociation = new PersonTeamAssociation {
            PersonId = dtoTeam.OwnerID,
            TeamId = newTeam.ID,
            EventId = dtoTeam.EventID,
            DateJoined = DateTime.UtcNow
        };

        var results = await personTeamAssoicationRepository.AddAsync(personTeamAssociation);

        return mapper.Map<DtoTeam>(newTeam);
    }

    [HttpPut("{teamId}")]
    public async Task<IActionResult> Edit([FromBody] DtoTeam dtoTeam)
    {
        log.LogInformation("Editing dtoTeam {dtoTeam}", dtoTeam);
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
        log.LogInformation("Deleting team {id}", id);
        if (!await teamRepository.ExistsAsync(id))
            return NotFound("Team id does not exist");

        try
        {
            await teamRepository.DeleteTeamAsync(id);
            return Ok();
        }
        catch (UnableToDeleteException<Team> ex)
        {
            return BadRequest(ex.Message);
        }

    }
}