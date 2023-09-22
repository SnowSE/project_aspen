using AutoMapper;
using v2.Controllers;
using v2.DataAccess;

namespace v2.Services
{
    public class AdminService : IAdminService
    {
        public const string AspenAdminRole = "admin-aspen";
        private readonly IDonationRepository donationRepository;
        private readonly IMapper mapper;

        public AdminService(IDonationRepository donationRepository, IMapper mapper)
        {
            this.donationRepository = donationRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<DtoDonation>> GetTeamDonationsAsync(long teamID)
        {
            var donations = await donationRepository.GetByTeamIdAsync(teamID);

            return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
        }

        public async Task<IEnumerable<DtoDonation>> GetEventDonationsAsync(long eventID)
        {
            var donations = await donationRepository.GetByEventIdAsync(eventID);

            return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
        }
    }
}
