using Api.DbModels;
using Api.DtoModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IEventRepository
    {
        Task AddEventAsync(DtoEvent e);
        Task DeleteEventAsync(string id);
        Task EditEventAsync(DtoEvent e);
        bool EventExists(string id);
        Task<DtoEvent> GetEventByIdAsync(string id);
        Task<IEnumerable<DtoEvent>> GetEventsAsync();

    }
}