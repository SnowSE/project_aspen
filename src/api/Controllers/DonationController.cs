﻿namespace Api.Controllers;

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
        log.LogInformation("Adding {dtoDonation}", dtoDonation);
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
        log.LogInformation("Getting the total donations for {eventID} from team {teamID}", eventID, teamID);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        var sum = await donationRepository.GetTeamDonationSum(eventID, teamID);
        return sum;
    }

    [HttpGet("{eventID}")]
    public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
    {
        log.LogInformation("Getting the total donations for {eventID}", eventID);
        var sum = await donationRepository.GetEventDonationSum(eventID);
        return sum;
    }
}
