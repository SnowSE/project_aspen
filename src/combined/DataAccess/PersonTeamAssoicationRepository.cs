using Npgsql;
using Serilog;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace v2.DataAccess;

public interface IPersonTeamAssoicationRepository
{

    Task<DtoPersonTeamAssociation> AddAsync(DtoPersonTeamAssociation personTeamAssociation);
    Task SwitchTeamAsync(DtoPersonTeamAssociation personTeamAssociation);

    Task<DtoTeam> GetTeamAsync(long personId, long eventId);
    Task<DtoPersonTeamAssociation> GetPersonTeamAssociationAsync(long personId, long eventId);
    Task<IEnumerable<DtoPerson>> GetTeamMembersAsync(long teamId);

    Task<bool> ExistsAsync(long personId, long eventId);

    Task DeleteAsync(long personId, long teamId);
}

public class PersonTeamAssoicationRepository : IPersonTeamAssoicationRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public PersonTeamAssoicationRepository(AspenContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<DtoPersonTeamAssociation> GetPersonTeamAssociationAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        return mapper.Map<DtoPersonTeamAssociation>(dbPersonTeamAssociation);
    }

    public async Task<DtoPersonTeamAssociation> AddAsync(DtoPersonTeamAssociation personTeamAssociation)
    {
        var dbPersonTeamAssociation = mapper.Map<DbPersonTeamAssociation>(personTeamAssociation);
        try
        {
            await context.PersonTeamAssociations.AddAsync(dbPersonTeamAssociation);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            if (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
            {
                throw new Exception("This person is already on the team for this event.");
            }
        }
        return mapper.Map<DtoPersonTeamAssociation>(dbPersonTeamAssociation);
    }

    public async Task<DtoTeam> GetTeamAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        var dbTeam = await context.Teams.FindAsync(dbPersonTeamAssociation.TeamId);
        return mapper.Map<DtoTeam>(dbTeam);
    }

    public async Task<IEnumerable<DtoPerson>> GetTeamMembersAsync(long teamId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.TeamId == teamId)
            .ToListAsync();
        var personIds = dbPersonTeamAssociation.Select(e => e.PersonId);
        var persons = await context.Persons.Where(e => personIds.Contains(e.ID)).ToListAsync();
        return mapper.Map<IEnumerable<DtoPerson>>(persons);
    }

    public async Task<bool> ExistsAsync(long personId, long eventId)
    {
        return await context.PersonTeamAssociations.AnyAsync(e => e.PersonId == personId && e.EventId == eventId);
    }

    public async Task DeleteAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        if (dbPersonTeamAssociation != null)
        {
            context.PersonTeamAssociations.Remove(dbPersonTeamAssociation);
            await context.SaveChangesAsync();
        }
        else
        {
            throw new NotFoundException<DtoPersonTeamAssociation>("Person is not on a team in this Event");
        }

    }

    public async Task SwitchTeamAsync(DtoPersonTeamAssociation personTeamAssociation)
    {
            var dbPersonTeamAssociation = mapper.Map<DbPersonTeamAssociation>(personTeamAssociation);
            context.Update(dbPersonTeamAssociation);
            await context.SaveChangesAsync();        
    }
}
