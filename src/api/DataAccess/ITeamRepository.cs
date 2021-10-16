using Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface ITeamRepository
    {
        Task AddTeamAsync(DbTeam team, string EventID);
        Task DeleteTeamAsync(string id);
        Task EditTeamAsync(DbTeam team);
        Task<DbTeam> GetTeamByIdAsync(string id);
        Task<IEnumerable<DbTeam>> GetTeamsAsync();
        Task<DbTeam> GetEventTeamByIdAsync(string id, string eventID);
        Task<IEnumerable<DbTeam>> GetEventTeamsAsync(string eventID);
        bool TeamExists(string id);
    }
}