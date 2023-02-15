namespace Api.DbModels;

public record DbDonation
{
    public long ID { get; init; }
    public long? PersonID { get; init; }
    public DbPerson Person { get; init; }
    public DateTime Date { get; init; }
    public decimal Amount { get; init; }
    public bool IsPledge { get; init; } = false;
    public Guid TransactionNumber { get; init; }
    public string? AuthorizationNumber { get; init; }
    public string? LinkGuid { get; init; }
}
