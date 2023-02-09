namespace Api.DbModels;

public record DbLinkRecord
{
    public long ID { get; init; }
    public long LinkID { get; init; }
    public DbLink Link { get; init; }
    public long? PersonID { get; init; }
    public DateTime Date { get; init; }

}

