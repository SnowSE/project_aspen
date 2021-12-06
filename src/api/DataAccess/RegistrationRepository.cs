namespace Api.DataAccess;

public interface IRegistrationRepository
{
    Task<Registration> AddAsync(Registration registration);
    Task DeleteAsync(long registrationID);
    Task<Registration> EditAsync(Registration registration);
    Task<IEnumerable<Registration>> GetAllAsync();
    Task<Registration> GetByIdAsync(long registrationID);
    Task<bool> ExistsAsync(long registrationID);
    Task<Registration> LinkPersonToRegistrationAsync(long registrationId, long personId);
}

public class RegistrationRepository : IRegistrationRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public RegistrationRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Registrations.AnyAsync(e => e.ID == id);
    }

    public async Task<IEnumerable<Registration>> GetAllAsync()
    {
        var dbRegistrations = await EntityFrameworkQueryableExtensions
            .ToListAsync(context.Registrations);
        return mapper.Map<List<Registration>>(dbRegistrations);
    }

    public async Task<Registration> GetByIdAsync(long registrationID)
    {
        var dbRegistration = await context.Registrations
            //.Include(r=>r.PersonRegistrations)
            .FirstOrDefaultAsync(r => r.ID == registrationID);
        if (dbRegistration == null)
            throw new NotFoundException<Registration>();
        return mapper.Map<Registration>(dbRegistration);
    }

    public async Task<Registration> AddAsync(Registration registration)
    {
        var dbRegistration = mapper.Map<DbRegistration>(registration);
        context.Registrations.Add(dbRegistration);
        await context.SaveChangesAsync();
        return mapper.Map<Registration>(dbRegistration);
    }

    public async Task<Registration> EditAsync(Registration registration)
    {
        var dbRegistration = mapper.Map<DbRegistration>(registration);
        context.Update(dbRegistration);
        await context.SaveChangesAsync();
        return mapper.Map<Registration>(dbRegistration);
    }

    public async Task DeleteAsync(long registrationID)
    {
        var registration = await context.Registrations.FindAsync(registrationID);

        context.Registrations.Remove(registration);
        await context.SaveChangesAsync();
    }

    public async Task<Registration> LinkPersonToRegistrationAsync(long registrationId, long personId)
    {
        var registration = await context.Registrations.FindAsync(registrationId) ?? throw new NotFoundException<Registration>();
        var person = await context.Persons.FindAsync(personId) ?? throw new NotFoundException<Person>();

        var personRegistration = new DbPersonRegistration
        {
            CreatedDate = DateTime.Now,
            PersonID = personId,
            RegistrationID = registrationId
        };
        context.PersonRegistrations.Add(personRegistration);
        await context.SaveChangesAsync();

        var updatedRegistration = await context.Registrations
            .Include(r => r.PersonRegistrations)
            .ThenInclude(pr => pr.Person)
            .FirstOrDefaultAsync(r => r.ID == registrationId);
        return mapper.Map<Registration>(updatedRegistration);
    }
}
