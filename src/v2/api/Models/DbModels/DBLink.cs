namespace Api.DbModels;

public record DbLink
{
    public long ID { get; init; }
    public DbEvent Event { get; init; }
    public long EventID { get; init; }
    public DbPerson Person { get; init; }
    public long PersonID { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }
    public string LinkGUID { get; init; }

}

