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
    [Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<ActionResult<DtoDonation>> Add([FromBody] DtoDonation dtoDonation)
    {
        log.LogInformation("Adding {dtoDonation}", dtoDonation);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoDonation.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var donation = mapper.Map<DtoDonation>(dtoDonation);
        var newDonation = await donationRepository.AddAsync(donation);
        return mapper.Map<DtoDonation>(newDonation);
    }

    [HttpGet("team/{teamID}")]
    public async Task<ActionResult<decimal>> GetTeamDonationSum(long teamID)
    {
        log.LogInformation("Getting the total donations from team {teamID}", teamID);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var sum = await donationRepository.GetTeamDonationSum(teamID);
        return sum;
    }

    [HttpGet("totalDonations")]
    public async Task<ActionResult<int>> GetAllDonations()
    {
        var totalDonations = await donationRepository.GetAllAsync();
        return totalDonations.Count();
    }

    [HttpGet("event/{eventID}")]
    public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
    {
        log.LogInformation("Getting the total donations for {eventID}", eventID);
        var sum = await donationRepository.GetEventDonationSumAsync(eventID);
        return sum;
    }

}
