using Serilog;

namespace Api.Controllers;

[Route("api/donations")]
[ApiController]
public class DonationController : ControllerBase
{
    private readonly IDonationRepository donationRepository;
    private readonly IMapper mapper;
    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public DonationController(IDonationRepository donationRepository, IMapper mapper)
    {
        this.donationRepository = donationRepository;
        this.mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<DtoDonation>> Add([FromBody] DtoDonation dtoDonation)
    {
        Log.Debug("HttpPost Add dtoDonation");
        Log.Information("Added {dtoDonation}", dtoDonation);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoDonation.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var donation = mapper.Map<Donation>(dtoDonation);
        var newDonation = await donationRepository.AddAsync(donation);
        return mapper.Map<DtoDonation>(newDonation);
    }

    [HttpGet("{eventID}/{teamID}")]
    public async Task<ActionResult<decimal>> GetTeamDonationSum(long eventID, long teamID)
    {
        Log.Debug("HttpGet({eventID}/{teamID})");
        Log.Information("Getting the total donations for {eventID} from team {teamID}", eventID, teamID);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var sum = await donationRepository.GetTeamDonationSum(eventID, teamID);
        return sum;
    }

    [HttpGet("{eventID}")]
    public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
    {
        Log.Debug("HttpGet({eventID})");
        Log.Information("Getting the total donations for {eventID}", eventID);
        var sum = await donationRepository.GetEventDonationSum(eventID);
        return sum;
    }
}
