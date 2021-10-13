using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Api.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Aspen.Api.DataAccess
{
    public class TeamRepository
    {

        private readonly AspenContext _context;

        public TeamRepository(AspenContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        private bool TeamExists(string teamID)
        {
            return _context.Teams.Any(e => e.ID == teamID);
        }

        //Get all teams
        public async Task<IEnumerable<DbTeam>> GetTeamsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Teams);

        }

        //Get team
        public async Task<DbTeam> GetTeamAsync(string teamID)
        {
            return await _context.Teams
                .FirstAsync(r => r.ID == teamID);
        }

        //Add team
        public async Task AddTeamAsync(DbTeam team)
        {
            if (!TeamExists(team.ID))
            {
                _context.Teams.Add(team);
                await _context.SaveChangesAsync();
            }
        }

        //edit
        public async Task EditTeamAsync(DbTeam team)
        {
            _context.Update(team);
            await _context.SaveChangesAsync();
        }

        //delete team
        public async Task DeleteEventAsync(string teamID)
        {
            var team = await _context.Teams.FindAsync(teamID);

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
        }

    }
}
