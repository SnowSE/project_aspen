using Api.DbModels;
using Api.DtoModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface ITeamRepository
    {
        Task AddTeamAsync(DtoTeam team, string EventID);
        Task DeleteTeamAsync(string id);
        Task EditTeamAsync(DtoTeam team);
        Task<DtoTeam> GetTeamByIdAsync(string id);
        Task<IEnumerable<DtoTeam>> GetTeamsAsync();
        Task<DtoTeam> GetEventTeamByIdAsync(string id, string eventID);
        Task<IEnumerable<DtoTeam>> GetEventTeamsAsync(string eventID);
        bool TeamExists(string id);
    }
}