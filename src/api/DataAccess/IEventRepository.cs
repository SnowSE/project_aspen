using Aspen.Api.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnet.DataAccess
{
    public interface IEventRepository
    {
        Task AddEventAsync(DbEvent e);
        Task DeleteEventAsync(string eventID);
        Task EditEventAsync(DbEvent e);
        bool EventExists(string eventID);
        Task<DbEvent> GetEventAsync(string eventID);
        Task<IEnumerable<DbEvent>> GetEventsAsync();
    }
}