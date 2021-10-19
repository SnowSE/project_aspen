using Api;
using Api.DataAccess;
using Api.DbModels;
using Api.DtoModels;
using AutoMapper;
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
        private readonly IMapper mapper;

        public EventRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public bool EventExists(string id)
        {
            return context.Events.Any(e => e.ID == id);
        }

        //Get all events
        public async Task<IEnumerable<DtoEvent>> GetEventsAsync()
        {
            var eventList = await EntityFrameworkQueryableExtensions.ToListAsync(context.Events);
            return mapper.Map<IEnumerable<DbEvent>, IEnumerable<DtoEvent>>(eventList);
        }

        //Get event
        public async Task<DtoEvent> GetEventByIdAsync(string id)
        {
            var e = await context.Events.FindAsync(id);

            return mapper.Map<DtoEvent>(e);
        }

        //Add event
        public async Task<DtoEvent> AddEventAsync(DtoEvent e)
        {
            var newEvent = mapper.Map<DbEvent>(e);
            context.Events.Add(newEvent);
            await context.SaveChangesAsync();

            return mapper.Map<DtoEvent>(newEvent);
        }

        //edit event
        public async Task EditEventAsync(DtoEvent e)
        {
            //This needs a fix to check for id if the even does not exist
            var dbEvent = mapper.Map<DbEvent>(e);
            context.Update(dbEvent);
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