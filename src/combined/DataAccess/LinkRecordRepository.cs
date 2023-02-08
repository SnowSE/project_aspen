namespace Api.DataAccess;

public interface ILinkRecordRepository
{
    Task<LinkRecord> Add(LinkRecord linkRecord);

}

public class LinkRecordRepository : ILinkRecordRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public LinkRecordRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<LinkRecord> Add(LinkRecord linkRecord)
    {
        var dbLinkRecord = mapper.Map<DbLinkRecord>(linkRecord);
        await context.LinkRecords.AddAsync(dbLinkRecord);

        await context.SaveChangesAsync();
        return mapper.Map<LinkRecord>(dbLinkRecord);
    }


}
