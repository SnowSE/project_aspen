namespace Api.DbModels;

public record DBLink
{
    public long ID { get; init; }
    public DbEvent Event { get; init; }
    public DbPerson Person { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }

}

