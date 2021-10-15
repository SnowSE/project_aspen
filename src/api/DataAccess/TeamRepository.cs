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
        public bool TeamExists(string teamID)
        {
            return context.Teams.Any(e => e.ID == teamID);
        }

        //Get all teams
        public async Task<IEnumerable<DbTeam>> GetTeamsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
        }

        //Get team
        public async Task<DbTeam> GetTeamAsync(string teamID)
        {
            return await context.Teams
                .FirstAsync(r => r.ID == teamID);
        }

        //Add team
        public async Task AddTeamAsync(DbTeam team, string EventID)
        {
            var existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == EventID);

            if (!TeamExists(team.ID))
            {
                team.Event = existingEvent;
                team.EventID = existingEvent.ID;

                context.Teams.Add(team);
                existingEvent.Teams.Add(team);

                context.Update(existingEvent);

                existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == EventID);

                await context.SaveChangesAsync();
            }
        }

        //edit
        public async Task EditTeamAsync(DbTeam team)
        {
            context.Update(team);
            await context.SaveChangesAsync();
        }

        //delete team
        public async Task DeleteTeamAsync(string teamID)
        {
            var team = await context.Teams.FindAsync(teamID);

            context.Teams.Remove(team);
            await context.SaveChangesAsync();
        }

    }
}
