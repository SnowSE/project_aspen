
namespace Api.Controllers;

using Api.DataAccess;
using NuGet.Protocol;
using Serilog;

[Route("api/teams")]
[ApiController]
public class TeamController : ControllerBase
{
    public const string AspenAdminRole = "admin-aspen";

    private readonly ITeamRepository teamRepository;
    private readonly IPersonTeamAssoicationRepository personTeamAssoicationRepository;
    private readonly IPersonRepository personRepository;
    private readonly IMapper mapper;
    private readonly ILogger<TeamController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public TeamController(ITeamRepository teamRepository, IMapper mapper, ILogger<TeamController> log, IPersonTeamAssoicationRepository personTeamAssoicationRepository, IPersonRepository personRepository)
    {
        this.teamRepository = teamRepository;
        this.personTeamAssoicationRepository = personTeamAssoicationRepository;
        this.personRepository = personRepository;
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

    [HttpPost, Authorize]
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

    [HttpPut, Authorize]
    public async Task<IActionResult> Edit([FromBody] DtoTeam dtoTeam)
    {
        log.LogInformation("Editing dtoTeam {dtoTeam}", dtoTeam);
        var role = "";
        var team = mapper.Map<Team>(dtoTeam);
        var teamOwner = team.OwnerID;
        var emailAddress = User.Claims.Single(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
        try
        {
            role = User.Claims.Single(d => d.Type == "realm_access").Value;
        }
            catch (Exception e) {
        }
        var person = await personRepository.GetByAuthIdAsync(emailAddress);

        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (person.ID != teamOwner && !role.Contains(AspenAdminRole))
            return Unauthorized("You are not the owner of this team");

        if (!await teamRepository.ExistsAsync(team.ID))
            return NotFound("Team id does not exist");

        await teamRepository.EditTeamAsync(team);
        return Ok("Team edit was successful");

    }

    [HttpDelete("{id}"), Authorize]
    public async Task<IActionResult> Delete([FromBody] DtoTeam dtoTeam)
    {
        var role = "";
        dtoTeam.IsArchived = true;
        var team = mapper.Map<Team>(dtoTeam);
        var teamOwner = team.OwnerID;
        var emailAddress = User.Claims.Single(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
        try
        {
            role = User.Claims.Single(d => d.Type == "realm_access").Value;
        }
        catch (Exception e)
        {
            log.LogInformation("User is not logged in");
        }

        var person = await personRepository.GetByAuthIdAsync(emailAddress);

        if (!await teamRepository.ExistsAsync(dtoTeam.ID))
            return NotFound("Team id does not exist");

        var peopleOnTeam = await personTeamAssoicationRepository.GetTeamMembersAsync(dtoTeam.ID);

        if (person.ID == teamOwner && peopleOnTeam.Count() > 1)
            return BadRequest("Cannot delete a team with members on it!");

        if (person.ID == teamOwner && peopleOnTeam.Count() == 1)
            try
            {
                await teamRepository.EditTeamAsync(team);
                return Ok();
            }
            catch (UnableToDeleteException<Team> ex)
            {
                return BadRequest(ex.Message);
            }

        if (role.Contains(AspenAdminRole))
        {

            try
            {
                await teamRepository.EditTeamAsync(team);
                return Ok();
            }
            catch (UnableToDeleteException<Team> ex)
            {
                return BadRequest(ex.Message);
            }
        }

        return BadRequest("Can not delete team at this time.");
    }
}