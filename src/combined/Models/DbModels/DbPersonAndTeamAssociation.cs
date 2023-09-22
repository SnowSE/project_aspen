namespace v2.DbModels;

public record DbPersonTeamAssociation
{
    public int Id { get; init; }
    public long PersonId { get; init; }
    public DbPerson Person { get; init; }
    public long TeamId { get; init; }
    public DbTeam Team { get; init; }
    public long EventId { get; init; }
    public DbEvent Event { get; init; }
    public DateTime DateJoined { get; init; }
}
