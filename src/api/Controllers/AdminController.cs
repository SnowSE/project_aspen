using Serilog;
using shared.DtoModels;

namespace Api.Controllers;

[ApiController]
[Authorize]
[Route("/api/[controller]")]
public class AdminController : ControllerBase
{
    public const string AspenAdminRole = "admin-aspen";
    private readonly IDonationRepository donationRepository;
    private readonly IEventRepository eventRepository;
    private readonly IMapper mapper;
    private readonly ILogger<AdminController> log;


    public AdminController(IDonationRepository donationRepository, IEventRepository eventRepository, IMapper mapper)
    {
        this.donationRepository = donationRepository;
        this.eventRepository = eventRepository;
        this.mapper = mapper;
    }

    [HttpGet, Authorize(Roles = AspenAdminRole)]
    public IEnumerable<UserClaim> Get() =>
        User.Claims.Select(c => new UserClaim(c.Type.ToString(), c.Value.ToString()));

    [HttpGet("donation/{eventID}"), Authorize(Roles = AspenAdminRole)]
    public async Task<IEnumerable<DtoDonation>> GetEventDonations(long eventID)
    {
        Log.Debug("HttpGet donation/{eventID}");
        Log.Information("Looking at a donation for {eventID}", eventID);
        var donations = await donationRepository.GetByEventIdAsync(eventID);
        log.LogInformation("AdminController: GetEventDonations eventID: {id}", eventID);
        return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
    }

    [HttpGet("donation/{eventID}/{teamID}"), Authorize(Roles = AspenAdminRole)]
    public async Task<IEnumerable<DtoDonation>> GetTeamDonations(long eventID, long teamID)
    {
        Log.Debug("HttpGet donation/{eventID}/{teamID}");
        Log.Information("Looking at a donation for {eventID} with the team {teamID}", eventID, teamID);
        var donations = await donationRepository.GetByTeamIdAsync(eventID, teamID);
        log.LogInformation("AdminController: GetTeamDonations eventID: {eventid}, teamID: {teamid}", eventID, teamID);
        return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
    }
}

public record UserClaim(string claim, string value);
