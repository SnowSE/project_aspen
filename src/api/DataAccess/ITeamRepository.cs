using Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface ITeamRepository
    {
        Task AddTeamAsync(DbTeam team);
        Task DeleteTeamAsync(string teamID);
        Task EditTeamAsync(DbTeam team);
        Task<DbTeam> GetTeamAsync(string teamID);
        Task<IEnumerable<DbTeam>> GetTeamsAsync();
        bool TeamExists(string teamID);
    }
}