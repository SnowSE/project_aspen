using Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IEventRepository
    {
        Task AddEventAsync(DbEvent e);
        Task DeleteEventAsync(string id);
        Task EditEventAsync(DbEvent e);
        bool EventExists(string id);
        Task<DbEvent> GetEventByIdAsync(string id);
        Task<IEnumerable<DbEvent>> GetEventsAsync();

    }
}