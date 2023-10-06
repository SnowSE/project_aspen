
namespace v2.Services
{
    public interface IAdminService
    {
        public Task<IEnumerable<DtoDonation>> GetTeamDonationsAsync(long teamID);
        public Task<IEnumerable<DtoDonation>> GetEventDonationsAsync(long eventID);
    }
}
