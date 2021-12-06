namespace Api.DataAccess;

public interface IPageDataRepository
{
    Task<bool> ExistsAsync(string key);
    Task<DtoPageData> AddAsync(DtoPageData pageData);
    Task DeleteAsync(string key);
    Task EditAsync(string key, DtoPageData pageData);
    Task<IEnumerable<DtoPageData>> GetAllAsync();
    Task<DtoPageData> GetAsync(string key);
}

public class PageDataRepository : IPageDataRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public PageDataRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<bool> ExistsAsync(string key)
    {
        return await context.PageData.AnyAsync(e => e.Key == key);
    }


    public async Task<IEnumerable<DtoPageData>> GetAllAsync()
    {
        var AllPageData = await EntityFrameworkQueryableExtensions.ToListAsync(context.PageData);
        return mapper.Map<IEnumerable<DbPageData>, IEnumerable<DtoPageData>>(AllPageData);
    }

    public async Task<DtoPageData> GetAsync(string key)
    {
        var dbPageData = await context.PageData.FirstOrDefaultAsync(r => r.Key == key);
        return mapper.Map<DtoPageData>(dbPageData);
    }

    public async Task<DtoPageData> AddAsync(DtoPageData pageData)
    {
        var dbPageData = mapper.Map<DbPageData>(pageData);

        await context.PageData.AddAsync(dbPageData);
        await context.SaveChangesAsync();

        return mapper.Map<DtoPageData>(dbPageData);
    }

    public async Task EditAsync(string key, DtoPageData pageData)
    {
        var existingDbPageData = await context.PageData.AsNoTracking().FirstOrDefaultAsync(r => r.Key == key);
        var mappedPageData = mapper.Map<DbPageData>(pageData);
        // mappedPageData.ID = existingDbPageData.ID;

        var alteredPageData = mappedPageData with { ID = existingDbPageData.ID };
        context.Update(alteredPageData);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(string key)
    {
        var pageData = await context.PageData.FirstOrDefaultAsync(r => r.Key == key);

        context.PageData.Remove(pageData);
        await context.SaveChangesAsync();
    }
}
