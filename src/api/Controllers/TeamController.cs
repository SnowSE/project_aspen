namespace Api.Controllers;
using Microsoft.Extensions.Logging;
[Route("api/teams")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly ITeamRepository teamRepository;
    private readonly IMapper mapper;
    private readonly ILogger<TeamController> logger;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public TeamController(ITeamRepository teamRepository, IMapper mapper, ILogger<TeamController> logger )
    {
        this.teamRepository = teamRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    [HttpGet("event/{eventId}")]
    public async Task<ActionResult<IEnumerable<DtoTeam>>> GetByEventID(long eventId)
    {
        try
        {
            var teams = mapper.Map<IEnumerable<DtoTeam>>(await teamRepository.GetByEventIdAsync(eventId));
            logger.LogInformation($"GetByEventID: {teams.Count()} teams found for event {eventId}");
            return new ActionResult<IEnumerable<DtoTeam>>(teams);
        }
        catch(NotFoundException<IEnumerable<Team>> ex)
        {
            logger.LogError(ex.Message);
            return NotFound(ex.Message);
        }
    }

    [HttpGet("{teamId}")]
    public async Task<ActionResult<DtoTeam>> GetByID(long teamId)
    {
        logger.LogInformation($"GetByEventID: {teamId}");
        if (!await teamRepository.ExistsAsync(teamId))
            logger.LogError($"GetByID: Team {teamId} does not exist");
            return NotFound("Team id does not exist");
        return mapper.Map<DtoTeam>(await teamRepository.GetTeamByIdAsync(teamId));
    }

    [HttpPost]
    public async Task<ActionResult<DtoTeam>> Add([FromBody] DtoTeam dtoTeam)
    {
        if (!ModelState.IsValid)
            logger.LogError($"Error adding team: {getModelStateErrorMessage()}");
            return BadRequest(getModelStateErrorMessage());

        if (dtoTeam.ID != 0)
            logger.LogError($"Error adding team: Cannot add team with a valid id");
            return BadRequest("Cannot add with a valid id");

        var team = mapper.Map<Team>(dtoTeam);
        var newTeam = await teamRepository.AddAsync(team);
        logger.LogInformation($"Added new team {newTeam.ID}");
        return mapper.Map<DtoTeam>(newTeam);

    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] DtoTeam dtoTeam)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var team = mapper.Map<Team>(dtoTeam);

        if (!await teamRepository.ExistsAsync(team.ID))
            logger.LogError($"Error editing team: Team {team.ID} does not exist");
            return NotFound("Team id does not exist");

        logger.LogInformation($"Editing team {team.ID}");

        await teamRepository.EditTeamAsync(team);
        return Ok("Team edit was successful");

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        if (!await teamRepository.ExistsAsync(id))
            return NotFound("Team id does not exist");

        try
        {
            await teamRepository.DeleteTeamAsync(id);
            logger.LogInformation($"Deleted team {id}");
            return Ok();
        }
        catch(UnableToDeleteException<Team> ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
