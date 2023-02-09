namespace Api.DataAccess;

public interface ILinkRepository
{
    Task<Link> Add(Link link);
    Task<Link> GetLinkByIdentiferAsync(string linkIdentifier);

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

    public async Task<Link> Add(Link link)
    {
        var dbLink = mapper.Map<DbLink>(link);
        await context.Links.AddAsync(dbLink);

        await context.SaveChangesAsync();
        return mapper.Map<Link>(dbLink);
    }
    public async Task<Link> GetLinkByIdentiferAsync(string linkIdentifier)
    {
        var link = await context.Links.FirstOrDefaultAsync(l => l.LinkIdentifer == linkIdentifier);
        return mapper.Map<Link>(link);
    }


}
