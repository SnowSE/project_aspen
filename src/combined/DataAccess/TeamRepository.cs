namespace v2.DataAccess;

using Microsoft.Extensions.Logging;

public interface ITeamRepository
{
    Task<DtoTeam> AddAsync(DtoTeam team);
    //Task DeleteTeamAsync(Team team);
    Task<DtoTeam> EditTeamAsync(DtoTeam team);
    Task<DtoTeam> GetTeamByIdAsync(long id);
    Task<IEnumerable<DtoTeam>> GetAllAsync();
    Task<IEnumerable<DtoTeam>> GetByEventIdAsync(long eventID);
    Task<bool> ExistsAsync(long id);
}

public class TeamRepository : ITeamRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;
    private readonly IPersonTeamAssoicationRepository personTeamAssociationRepository;
    

    public TeamRepository(AspenContext context, IMapper mapper, IPersonTeamAssoicationRepository personTeamAssociationRepository)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
        this.personTeamAssociationRepository = personTeamAssociationRepository;
    }

   

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Teams.AnyAsync(e => e.ID == id);
    }
    public async Task<IEnumerable<DtoTeam>> GetAllAsync()
    {
        var teams = await EntityFrameworkQueryableExtensions.ToListAsync(context.Teams);
        return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(teams);
    }

    public async Task<DtoTeam> GetTeamByIdAsync(long id)
    {
        var team = await context.Teams.FirstAsync(r => r.ID == id);
        return mapper.Map<DtoTeam>(team);
    }

    public async Task<DtoTeam> AddAsync(DtoTeam team)
    {
        var existingEvent = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == team.EventID);
        var newTeam = team.WithEventId(existingEvent.ID);
        var dbTeam = mapper.Map<DbTeam>(newTeam);

        //check if person is on another team in this event
        var teamsInEvent = await context.Teams.Where(t => t.EventID == team.EventID).ToListAsync();
        foreach (var teamInEvent in teamsInEvent)
        {
            var teamMembers = await personTeamAssociationRepository.GetTeamMembersAsync(teamInEvent.ID);
            if (teamMembers.Any(member => member.ID == team.OwnerID))
            {
                throw new Exception("Person is already on another team in this event");
            }
        }
        
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
        if(team.IsArchived == true)
        {
            var teamMembers = await personTeamAssociationRepository.GetTeamMembersAsync(team.ID);

            foreach (var member in teamMembers)
            {
                await personTeamAssociationRepository.DeleteAsync(member.ID, team.EventID);
            }
        }
        await context.SaveChangesAsync();
        return team;
    }

  /*  public async Task DeleteTeamAsync(DtoTeam team)
    {
        var dbTeam = mapper.Map<DbTeam>(team);
        context.Update(dbTeam);


        var teamMembers = await personTeamAssociationRepository.GetTeamMembersAsync(team.ID);

        foreach (var member in teamMembers)
        {
            await personTeamAssociationRepository.DeleteAsync(member.ID, team.ID);
        }


        await context.SaveChangesAsync();
    }
*/

    public async Task<IEnumerable<DtoTeam>> GetByEventIdAsync(long eventID)
    {
        var existingEvent = await context.Events.Include(e => e.Teams).FirstOrDefaultAsync(e => e.ID == eventID);
        if (existingEvent == null)
            throw new NotFoundException<IEnumerable<DtoTeam>>($"Event {eventID} does not exist");

        var unArchivedTeams = existingEvent.Teams.Where(team => team.IsArchived == false).ToList();

        return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(unArchivedTeams);
    }

}
