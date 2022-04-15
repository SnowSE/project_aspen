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
        var donations = await donationRepository.GetByEventIdAsync(eventID);
        Log.Logger.Information("Team Donations: {event} recieved {donations}", eventID, donations);
        return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
    }

    [HttpGet("donation/{eventID}/{teamID}"), Authorize(Roles = AspenAdminRole)]
    public async Task<IEnumerable<DtoDonation>> GetTeamDonations(long eventID, long teamID)
    {
        var donations = await donationRepository.GetByTeamIdAsync(eventID, teamID);
        Log.Logger.Information("Team Donations: {team} donated to {event}", teamID, eventID);
        return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
    }
}

public record UserClaim(string claim, string value);
