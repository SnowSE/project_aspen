using Aspen.Api;
using Aspen.Api.DbModels;
using dotnet.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.DataAccess
{
    public class EventRepository
    {
        private readonly AspenContext _context;

        public EventRepository(AspenContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        private bool EventExists(string eventID)
        {
            return _context.Events.Any(e => e.ID == eventID);
        }

        //Get all events
        public async Task<IEnumerable<DbEvent>> GetEventsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Events);
        }

        //Get event
        public async Task<DbEvent> GetEventAsync(string eventID)
        {
            return await _context.Events
                .FirstAsync(r => r.ID == eventID);
        }

        //Add event
        public async Task AddEventAsync(DbEvent e)
        {
            if (!EventExists(e.ID)){
                 _context.Events.Add(e);
                await _context.SaveChangesAsync();
            }
        }

        //edit event
        public async Task EditEventAsync(DbEvent e)
        {
            _context.Update(e);
            await _context.SaveChangesAsync();
        }

        //delete event
        public async Task DeleteEventAsync(string eventID)
        {
            var e = await _context.Events.FindAsync(eventID);

            _context.Events.Remove(e);
            await _context.SaveChangesAsync();
        }

    }
}