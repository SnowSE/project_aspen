using Npgsql;
using Serilog;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Api.DataAccess;

public interface IPersonTeamAssoicationRepository
{

    Task<PersonTeamAssociation> AddAsync(PersonTeamAssociation personTeamAssociation);
    Task<Team> GetTeamAsync(long personId, long eventId);
    Task<PersonTeamAssociation> GetPersonTeamAssociationAsync(long personId, long eventId);
    Task<IEnumerable<Person>> GetTeamMembersAsync(long teamId);

    Task<bool> ExistsAsync(long personId, long eventId);
    Task DeleteAsync(long personId, long eventId);
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

    public async Task<PersonTeamAssociation> GetPersonTeamAssociationAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        return mapper.Map<PersonTeamAssociation>(dbPersonTeamAssociation);
    }

    public async Task<PersonTeamAssociation> AddAsync(PersonTeamAssociation personTeamAssociation)
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
        return mapper.Map<PersonTeamAssociation>(dbPersonTeamAssociation);
    }

    public async Task<Team> GetTeamAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        var dbTeam = await context.Teams.FindAsync(dbPersonTeamAssociation.TeamId);
        return mapper.Map<Team>(dbTeam);
    }

    public async Task<IEnumerable<Person>> GetTeamMembersAsync(long teamId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.TeamId == teamId)
            .ToListAsync();
        var personIds = dbPersonTeamAssociation.Select(e => e.PersonId);
        var persons = await context.Persons.Where(e => personIds.Contains(e.ID)).ToListAsync();
        return mapper.Map<IEnumerable<Person>>(persons);
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
            throw new NotFoundException<PersonTeamAssociation>("Person is not on a team in this Event");
        }

    }
}
