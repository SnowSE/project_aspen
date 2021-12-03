using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DtoModels;
using AutoMapper;
using Api.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Api.Models.Entities;

namespace Api.Controllers
{
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
            if (!ModelState.IsValid)
                return BadRequest(getModelStateErrorMessage());

            var sum = await donationRepository.GetTeamDonationSum(eventID, teamID);
            return sum;
        }

        [HttpGet("{eventID}")]
        public async Task<ActionResult<decimal>> GetEventDonationSum(long eventID)
        {
            var sum = await donationRepository.GetEventDonationSum(eventID);
            return sum;
        }
    }
}
