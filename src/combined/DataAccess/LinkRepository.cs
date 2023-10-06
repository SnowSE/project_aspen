namespace v2.DataAccess;

public interface ILinkRepository
{
    Task<DtoLink> Add(DtoLink link);
    Task<DtoLink> LinkGUIDAsync(string linkGUID);

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

    public async Task<DtoLink> Add(DtoLink link)
    {
        var dbLink = mapper.Map<DbLink>(link);
        await context.Links.AddAsync(dbLink);

        await context.SaveChangesAsync();
        return mapper.Map<DtoLink>(dbLink);
    }
    public async Task<DtoLink> LinkGUIDAsync(string linkGUID)
    {
        var link = await context.Links.FirstOrDefaultAsync(l => l.LinkGUID == linkGUID);
        return mapper.Map<DtoLink>(link);
    }


}
