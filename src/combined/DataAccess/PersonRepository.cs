namespace v2.DataAccess;

public interface IPersonRepository
{
    Task<bool> ExistsAsync(long id);
    Task<DtoPerson> AddAsync(string name, string bio, string nickname);
    Task<DtoPerson> AddAsync(string name, string bio, string authID, string nickname);
    Task DeleteAsync(long id);
    Task<DtoPerson> EditAsync(DtoPerson e);
    Task<DtoPerson> GetByIDAsync(long id);
    Task<DtoPerson> GetByAuthIdAsync(string authId);
}

public class PersonRepository : IPersonRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public PersonRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Persons.AnyAsync(e => e.ID == id);
    }

    public async Task<DtoPerson> AddAsync(string name, string bio, string nickname)
    {
        var dbPerson = new DbPerson()
        {
            Name = name,
            Bio = bio,
            AuthID = Guid.NewGuid().ToString(),
            Nickname = nickname
        };
        return await addDBPersonAsync(dbPerson);
    }

    public async Task<DtoPerson> AddAsync(string name, string bio, string authID, string nickname)
    {
        var dbPerson = new DbPerson()
        {
            Name = name,
            Bio = bio,
            AuthID = authID,
            Nickname = nickname
        };
        return await addDBPersonAsync(dbPerson);
    }

    private async Task<DtoPerson> addDBPersonAsync(DbPerson dbPerson)
    {
        await context.Persons.AddAsync(dbPerson);
        await context.SaveChangesAsync();
        return mapper.Map<DtoPerson>(dbPerson);
    }

    public async Task DeleteAsync(long id)
    {
        var person = await context.Persons.FindAsync(id);
        if (person == null)
        {
            throw new NotFoundException<DtoPerson>("Person id does not exist");
        }
        context.Persons.Remove(person);
        await context.SaveChangesAsync();
    }

    public async Task<DtoPerson> EditAsync(DtoPerson person)
    {
        var dbPerson = mapper.Map<DbPerson>(person);
        context.Update(dbPerson);
        await context.SaveChangesAsync();
        return person;
    }

    public async Task<DtoPerson> GetByIDAsync(long id)
    {
        var dbPerson = await context.Persons.FindAsync(id);
        if (dbPerson == null)
        {
            throw new NotFoundException<DtoPerson>($"Person id does not exist");
        }
        return mapper.Map<DtoPerson>(dbPerson);
    }

    public async Task<DtoPerson> GetByAuthIdAsync(string authId)
    {
        var dbPerson = await context.Persons.FirstOrDefaultAsync(p => p.AuthID == authId);
        if (dbPerson == null)
        {
            throw new NotFoundException<DtoPerson>($"Unable to locate person by authId");
        }
        return mapper.Map<DtoPerson>(dbPerson);
    }
}
