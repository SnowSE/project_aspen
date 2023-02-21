namespace Api.DataAccess;

public interface IPersonTeamAssoicationRepository
{

    Task<PersonTeamAssociation> AddAsync(long personId, long teamId, long eventId);
    Task<PersonTeamAssociation> GetTeamAsync(long personId, long eventId);

}

public class PersonTeamAssoication : IPersonTeamAssoicationRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public PersonTeamAssoication(AspenContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<PersonTeamAssociation> AddAsync(long personId, long teamId, long eventId)
    {
        var dbPersonTeamAssociation = new DbPersonTeamAssociation()
        {
            PersonId = personId,
            TeamId = teamId,
            EventId = eventId,
            DateJoined = DateTime.Now
        };
        await context.PersonTeamAssociations.AddAsync(dbPersonTeamAssociation);
        await context.SaveChangesAsync();
        return mapper.Map<PersonTeamAssociation>(dbPersonTeamAssociation);
    }

    public async Task<PersonTeamAssociation> GetTeamAsync(long personId, long eventId)
    {
        var dbPersonTeamAssociation = await context.PersonTeamAssociations
            .Where(e => e.PersonId == personId && e.EventId == eventId)
            .FirstOrDefaultAsync();
        return mapper.Map<PersonTeamAssociation>(dbPersonTeamAssociation);
    }
}
