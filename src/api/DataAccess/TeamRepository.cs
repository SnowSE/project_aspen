using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Api.DtoModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess
{
    public class TeamRepository : ITeamRepository
    {

        private readonly AspenContext context;
        private readonly IMapper mapper;

        public TeamRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }
        public bool TeamExists(string id)
        {
            return context.Teams.Any(e => e.ID == id);
        }

        public async Task<IEnumerable<DtoTeam>> GetTeamsAsync()
        {
            var teams = await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(teams);
        }

        public async Task<DtoTeam> GetTeamByIdAsync(string id)
        {
            var team = await context.Teams
                .FirstAsync(r => r.ID == id);

            return mapper.Map<DtoTeam>(team);
        }

        public async Task AddTeamAsync(DtoTeam dtoTeam, string eventID)
        {
            var existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == eventID);

            if (!TeamExists(dtoTeam.ID))
            {
                var dbTeam = mapper.Map<DbTeam>(dtoTeam);

                dbTeam.Event = existingEvent;
                dbTeam.EventID = existingEvent.ID;

                await context.Teams.AddAsync(dbTeam);
                existingEvent.Teams.Add(dbTeam);

                context.Update(existingEvent);

                await context.SaveChangesAsync();
            }
        }

        public async Task EditTeamAsync(DtoTeam team)
        {
            //This needs a fix

            var dbTeam = mapper.Map<DbTeam>(team);
            context.Update(dbTeam);
            await context.SaveChangesAsync();
        }

        public async Task DeleteTeamAsync(string id)
        {
            var team = await context.Teams.FindAsync(id);

            context.Teams.Remove(team);
            await context.SaveChangesAsync();
        }

        public async Task<DtoTeam> GetEventTeamByIdAsync(string teamId, string eventID)
        {
            var eventTeams = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);
            var eventTeam = eventTeams.Teams.FirstOrDefault(t => t.ID == teamId);

            return mapper.Map<DtoTeam>(eventTeam);
        }


        public async Task<IEnumerable<DtoTeam>> GetEventTeamsAsync(string eventID)
        {
            var existingEvent = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);

            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(existingEvent.Teams);
        }

    }
}
