namespace Api.DbModels;

public record DbDonation
{
    public long ID { get; init; }
    public long EventID { get; init; }
    public DbEvent Event { get; init; }
    public long? TeamID { get; init; }
    public DbTeam Team { get; init; }
    public long? PersonID { get; init; }
    public DbPerson Person { get; init; }
    public DateTime Date { get; init; }
    public decimal Amount { get; init; }
    public bool IsPending { get; init; } = true;
}
