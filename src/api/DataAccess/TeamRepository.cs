using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Api.DtoModels;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess
{
    public interface ITeamRepository
    {
        Task<DtoTeam> AddAsync(DtoTeam team, long eventID);
        Task DeleteTeamAsync(long id);
        Task<DtoTeam> EditTeamAsync(DtoTeam team);
        Task<DtoTeam> GetTeamByIdAsync(long id);
        Task<IEnumerable<DtoTeam>> GetTeamsAsync();
        Task<IEnumerable<DtoTeam>> GetTeamsByEventIdAsync(long eventID);
        bool TeamExists(long id);
    }

    public class TeamRepository : ITeamRepository
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public TeamRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public bool TeamExists(long id)
        {
            return context.Teams.Any(e => e.ID == id);
        }

        public async Task<IEnumerable<DtoTeam>> GetTeamsAsync()
        {
            var teams = await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(teams);
        }

        public async Task<DtoTeam> GetTeamByIdAsync(long id)
        {
            var team = await context.Teams
                .FirstAsync(r => r.ID == id);

            return mapper.Map<DtoTeam>(team);
        }

        public async Task<DtoTeam> AddAsync(DtoTeam dtoTeam, long eventID)
        {
            var existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == eventID);

            var dbTeam = mapper.Map<DbTeam>(dtoTeam).WithEvent(existingEvent);

            await context.Teams.AddAsync(dbTeam);
            existingEvent.Teams.Add(dbTeam);

            context.Update(existingEvent);

            await context.SaveChangesAsync();
            return mapper.Map<DtoTeam>(dbTeam);
        }

        public async Task<DtoTeam> EditTeamAsync(DtoTeam team)
        {
            var dbTeam = mapper.Map<DbTeam>(team);
            context.Update(dbTeam);
            await context.SaveChangesAsync();
            return team;
        }

        public async Task DeleteTeamAsync(long id)
        {
            var team = await context.Teams.FindAsync(id);

            context.Teams.Remove(team);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DtoTeam>> GetTeamsByEventIdAsync(long eventID)
        {
            var existingEvent = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);

            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(existingEvent.Teams);
        }

    }
}
