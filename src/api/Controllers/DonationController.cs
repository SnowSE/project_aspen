namespace Api.Controllers;
using Microsoft.Extensions.Logging;

[Route("api/donations")]
[ApiController]
public class DonationController : ControllerBase
{
    private readonly IDonationRepository donationRepository;
    private readonly IMapper mapper;
    private readonly ILogger<DonationController> logger;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public DonationController(IDonationRepository donationRepository, IMapper mapper, ILogger<DonationController> logger)
    {
        this.donationRepository = donationRepository;
        this.mapper = mapper;
        this.logger = logger;
    }


    [HttpPost]
    public async Task<ActionResult<DtoDonation>> Add([FromBody] DtoDonation dtoDonation)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoDonation.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var donation = mapper.Map<Donation>(dtoDonation);
        var newDonation = await donationRepository.AddAsync(donation);

        logger.LogInformation($"Adding donation: {newDonation.ID}");
        return mapper.Map<DtoDonation>(newDonation);
    }

    [HttpGet("{eventID}/{teamID}")]
    public async Task<ActionResult<decimal>> GetTeamDonationSum(long eventID, long teamID)
    {
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var sum = await donationRepository.GetTeamDonationSum(eventID, teamID);

        logger.LogInformation($"Getting team donation sum: {sum}");
        return sum;
    }

    [HttpGet("{eventID}")]
    public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
    {
        var sum = await donationRepository.GetEventDonationSum(eventID);

        logger.LogInformation($"Getting event donation sum: {sum}");
        return sum;
    }
}
