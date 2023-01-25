namespace Api.DataAccess;

public interface ILinkRepository
{
    Task<Link> AddAsync(Link link);

}

public class LinkRepository : ILinkRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public LinkRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<Link> AddAsync(Link link)
    {
        var dbLink = mapper.Map<DBLink>(link);
        await context.Links.AddAsync(dbLink);

        await context.SaveChangesAsync();
        return mapper.Map<Link>(dbLink);
    }


}
