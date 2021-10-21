using Api;
using Api.DataAccess;
using Api.DbModels;
using Api.DtoModels;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IEventRepository
    {
        Task<Event> AddEventAsync(Event e);
        Task DeleteEventAsync(long id);
        Task EditEventAsync(Event e);
        bool EventExists(long id);
        Task<Event> GetEventByIdAsync(long id);
        Task<IEnumerable<Event>> GetEventsAsync();
    }

    public class EventRepository : IEventRepository
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public EventRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public bool EventExists(long id)
        {
            return context.Events.Any(e => e.ID == id);
        }

        //Get all events
        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            var eventList = await EntityFrameworkQueryableExtensions.ToListAsync(context.Events);
            return mapper.Map<IEnumerable<DbEvent>, IEnumerable<Event>>(eventList);
        }

        //Get event
        public async Task<Event> GetEventByIdAsync(long id)
        {
            var e = await context.Events.FindAsync(id);

            return mapper.Map<Event>(e);
        }

        //Add event
        public async Task<Event> AddEventAsync(Event e)
        {
            var newEvent = mapper.Map<DbEvent>(e);
            context.Events.Add(newEvent);
            await context.SaveChangesAsync();

            return mapper.Map<Event>(newEvent);
        }

        //edit event
        public async Task EditEventAsync(Event e)
        {
            //This needs a fix to check for id if the even does not exist
            var dbEvent = mapper.Map<DbEvent>(e);
            context.Update(dbEvent);
            await context.SaveChangesAsync();
        }

        //delete event
        public async Task DeleteEventAsync(long id)
        {
            var e = await context.Events.FindAsync(id);

            context.Events.Remove(e);
            await context.SaveChangesAsync();
        }

    }
}