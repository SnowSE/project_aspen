namespace shared.DtoModels;

public class DbPersonTeamAssociation
{
    public int Id { get; set; }
    public long PersonId { get; set; }
    public DbPerson Person { get; set; }
    public long TeamId { get; set; }
    public DbTeam Team { get; set; }
    public long EventId { get; set; }
    public DbEvent Event { get; set; }
    public DateTime DateJoined { get; set; }
}
