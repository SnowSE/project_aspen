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

        public bool EventExists(string id)
        {
            return context.Events.Any(e => e.ID == id);
        }

        //Get all events
        public async Task<IEnumerable<DbEvent>> GetEventsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(context.Events);
        }

        //Get event
        public async Task<DbEvent> GetEventByIdAsync(string id)
        {
            return await context.Events
                .FirstAsync(r => r.ID == id);
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
        public async Task DeleteEventAsync(string id)
        {
            var e = await context.Events.FindAsync(id);

            context.Events.Remove(e);
            await context.SaveChangesAsync();
        }

    }
}