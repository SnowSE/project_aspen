using Api;
using Api.DataAccess;
using Api.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public class EventRepository : IEventRepository
    {
        private readonly AspenContext context;

        public EventRepository(AspenContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public bool EventExists(string eventID)
        {
            return context.Events.Any(e => e.ID == eventID);
        }

        //Get all events
        public async Task<IEnumerable<DbEvent>> GetEventsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(context.Events);
        }

        //Get event
        public async Task<DbEvent> GetEventAsync(string eventID)
        {
            return await context.Events
                .FirstAsync(r => r.ID == eventID);
        }

        //Add event
        public async Task AddEventAsync(DbEvent e)
        {
            if (!EventExists(e.ID))
            {
                context.Events.Add(e);
                await context.SaveChangesAsync();
            }
        }

        //edit event
        public async Task EditEventAsync(DbEvent e)
        {
            context.Update(e);
            await context.SaveChangesAsync();
        }

        //delete event
        public async Task DeleteEventAsync(string eventID)
        {
            var e = await context.Events.FindAsync(eventID);

            context.Events.Remove(e);
            await context.SaveChangesAsync();
        }

    }
}