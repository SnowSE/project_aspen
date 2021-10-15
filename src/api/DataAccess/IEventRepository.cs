using Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IEventRepository
    {
        Task AddEventAsync(DbEvent e);
        Task DeleteEventAsync(string eventID);
        Task EditEventAsync(DbEvent e);
        bool EventExists(string eventID);
        Task<DbEvent> GetEventAsync(string eventID);
        Task<IEnumerable<DbEvent>> GetEventsAsync();
        Task<DbTeam> GetEventTeamByIdAsync(string teamID, string eventID);
        Task<IEnumerable<DbTeam>> GetEventTeamsAsync(string eventID);
    }
}