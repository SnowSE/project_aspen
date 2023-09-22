namespace v2.Controllers;

[ApiController]
[Authorize(Roles = AspenAdminRole)]
[Route("/api/[controller]")]
public class AdminController : ControllerBase
{
    public const string AspenAdminRole = "admin-aspen";
   
    private IAdminService service;
    public AdminController(IAdminService service)
    {
        this.service = service;
    }

    [HttpGet]
    public IEnumerable<UserClaim> Get()
    {
        return User.Claims.Select(c => new UserClaim(c.Type.ToString(), c.Value.ToString()));
    }

    [HttpGet("donation/{eventID}/{teamID}")]
    public async Task<IEnumerable<DtoDonation>> GetTeamDonations( long teamID)
    {
        return await service.GetTeamDonationsAsync(teamID);
    }

    [HttpGet("donations/event/{eventID}")]
    public async Task<IEnumerable<DtoDonation>> GetEventDonations(long eventID)
    {
        return await service.GetEventDonationsAsync(eventID);
    }
}

public record UserClaim(string claim, string value);
