namespace Api.Controllers;

[Route("api/donations")]
[ApiController]
public class DonationController : ControllerBase
{
    private readonly IDonationRepository donationRepository;
    private readonly IMapper mapper;
    private readonly ILogger<DonationController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public DonationController(IDonationRepository donationRepository, IMapper mapper, ILogger<DonationController> log)
    {
        this.donationRepository = donationRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpPost]
    public async Task<ActionResult<DtoDonation>> Add([FromBody] DtoDonation dtoDonation)
    {
        log.LogDebug("HttpPost Add dtoDonation");
        log.LogInformation("Added {dtoDonation}", dtoDonation);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoDonation.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var donation = mapper.Map<Donation>(dtoDonation);
        var newDonation = await donationRepository.AddAsync(donation);
        log.LogInformation("donation: Added new donation {amount}", newDonation);
        return mapper.Map<DtoDonation>(newDonation);
    }

    [HttpGet("{eventID}/{teamID}")]
    public async Task<ActionResult<decimal>> GetTeamDonationSum(long eventID, long teamID)
    {
        log.LogDebug("HttpGet({eventID}/{teamID})");
        log.LogInformation("Getting the total donations for {eventID} from team {teamID}", eventID, teamID);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var sum = await donationRepository.GetTeamDonationSum(eventID, teamID);
        log.LogInformation("donation: event id {eventID} got this team {teamId}",eventID, teamID);

        return sum;
    }

    [HttpGet("{eventID}")]
    public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
    {
        log.LogDebug("HttpGet({eventID})");
        log.LogInformation("Getting the total donations for {eventID}", eventID);
        var sum = await donationRepository.GetEventDonationSum(eventID);
        log.LogInformation("donation: the donation sum from event is {sum}", sum);
        return sum;
    }
}
