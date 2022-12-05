namespace Api.DataAccess;

public interface ITeamRepository
{
    Task<Team> AddAsync(Team team);
    Task DeleteTeamAsync(long id);
    Task<Team> EditTeamAsync(Team team);
    Task<Team> GetTeamByIdAsync(long id);
    Task<IEnumerable<Team>> GetAllAsync();
    Task<IEnumerable<Team>> GetByEventIdAsync(long eventID);
    Task<bool> ExistsAsync(long id);
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

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Teams.AnyAsync(e => e.ID == id);
    }

    public async Task<IEnumerable<Team>> GetAllAsync()
    {
        var teams = await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
        return mapper.Map<IEnumerable<DbTeam>, IEnumerable<Team>>(teams);
    }

    public async Task<Team> GetTeamByIdAsync(long id)
    {
        var team = await context.Teams
            .Include(t => t.Registrations)
                .ThenInclude(r=>r.PersonRegistrations)
                    .ThenInclude(pr=>pr.Person)
            .FirstAsync(r => r.ID == id);
        return mapper.Map<Team>(team);
    }

    public async Task<Team> AddAsync(Team team)
    {
        var existingEvent = await EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(context.Events, c => c.ID == team.EventID);
        var newTeam = team.WithEventId(existingEvent.ID);
        var dbTeam = mapper.Map<DbTeam>(newTeam);

        await context.Teams.AddAsync(dbTeam);
        existingEvent.Teams.Add(dbTeam);

        context.Update(existingEvent);

        await context.SaveChangesAsync();
        return mapper.Map<Team>(dbTeam);
    }

    public async Task<Team> EditTeamAsync(Team team)
    {
        var dbTeam = mapper.Map<DbTeam>(team);
        context.Update(dbTeam);
        await context.SaveChangesAsync();
        return team;
    }

    public async Task DeleteTeamAsync(long id)
    {
        var team = await context.Teams.Include(t => t.Donations).FirstOrDefaultAsync(t => t.ID == id);
        if (team == null)
            throw new NotFoundException<Team>($"Team id does not exist");

        if(team.Donations.Any())
        {
            var donationIds = string.Join(", ", team.Donations.Select(d => d.ID));
            throw new UnableToDeleteException<Team>($"Unable to delete team {id}, donation(s) {donationIds} are linked to team.");
        }


        context.Teams.Remove(team);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Team>> GetByEventIdAsync(long eventID)
    {
        var existingEvent = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);
        if (existingEvent == null)
            throw new NotFoundException<IEnumerable<Team>>($"Event {eventID} does not exist");

        return mapper.Map<IEnumerable<DbTeam>, IEnumerable<Team>>(existingEvent.Teams);
    }

}
