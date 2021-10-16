using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess
{
    public class TeamRepository : ITeamRepository
    {

        private readonly AspenContext context;

        public TeamRepository(AspenContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public bool TeamExists(string id)
        {
            return context.Teams.Any(e => e.ID == id);
        }

        public async Task<IEnumerable<DbTeam>> GetTeamsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
        }

        public async Task<DbTeam> GetTeamByIdAsync(string id)
        {
            return await context.Teams
                .FirstAsync(r => r.ID == id);
        }

        public async Task AddTeamAsync(DbTeam team, string eventID)
        {
            var existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == eventID);

            if (!TeamExists(team.ID))
            {
                team.Event = existingEvent;
                team.EventID = existingEvent.ID;

                context.Teams.Add(team);
                existingEvent.Teams.Add(team);

                context.Update(existingEvent);

                existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == eventID);

                await context.SaveChangesAsync();
            }
        }

        public async Task EditTeamAsync(DbTeam team)
        {
            context.Update(team);
            await context.SaveChangesAsync();
        }

        public async Task DeleteTeamAsync(string id)
        {
            var team = await context.Teams.FindAsync(id);

            context.Teams.Remove(team);
            await context.SaveChangesAsync();
        }

        public async Task<DbTeam> GetEventTeamByIdAsync(string teamId, string eventID)
        {
            var eventTeams = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);
            var eventTeam = eventTeams.Teams.FirstOrDefault(t => t.ID == teamId);
            return eventTeam;
        }


        public async Task<IEnumerable<DbTeam>> GetEventTeamsAsync(string eventID)
        {
            var eventTeams = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);
            return eventTeams.Teams;
        }

    }
}
