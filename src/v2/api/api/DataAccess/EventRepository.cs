namespace Api.DataAccess;

public interface IEventRepository
{
    Task<DtoEvent> AddAsync(DtoEvent newEvent);
    Task DeleteAsync(long id);
    Task EditAsync(DtoEvent e);
    public Task<bool> ExistsAsync(long id);
    Task<DtoEvent> GetByIdAsync(long id);
    Task<IEnumerable<DtoEvent>> GetAllAsync();
}

public class EventRepository : IEventRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public EventRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Events.AnyAsync(e => e.ID == id);
    }

    public async Task<IEnumerable<DtoEvent>> GetAllAsync()
    {
        var eventList = await EntityFrameworkQueryableExtensions.ToListAsync(context.Events);
        return mapper.Map<IEnumerable<DbEvent>, IEnumerable<DtoEvent>>(eventList);
    }

    public async Task<DtoEvent> GetByIdAsync(long id)
    {
        var e = await context.Events.FindAsync(id);

        return mapper.Map<DtoEvent>(e);
    }
    public async Task<DtoEvent> AddAsync(DtoEvent @event)
    {
        var newEvent = mapper.Map<DbEvent>(@event);
        context.Events.Add(newEvent);
        await context.SaveChangesAsync();

        return mapper.Map<DtoEvent>(newEvent);
    }

    public async Task EditAsync(DtoEvent e)
    {
        var dbEvent = mapper.Map<DbEvent>(e);
        context.Update(dbEvent);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(long id)
    {
        var e = await context.Events.FindAsync(id);
        if (e == null)
            throw new NotFoundException<DtoEvent>("Event id does not exist");
        context.Events.Remove(e);
        await context.SaveChangesAsync();
    }
}