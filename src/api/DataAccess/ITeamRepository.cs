using Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface ITeamRepository
    {
        Task AddTeamAsync(DbTeam team, string EventID);
        Task DeleteTeamAsync(string teamID);
        Task EditTeamAsync(DbTeam team);
        Task<DbTeam> GetTeamAsync(string teamID);
        Task<IEnumerable<DbTeam>> GetTeamsAsync();
        Task<DbTeam> GetEventTeamByIdAsync(string teamID, string eventID);
        Task<IEnumerable<DbTeam>> GetEventTeamsAsync(string eventID);
        bool TeamExists(string teamID);
    }
}