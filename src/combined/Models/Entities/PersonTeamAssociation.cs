namespace Api.Models.Entities;

public class PersonTeamAssociation
{
    public int Id { get; init; }
    
    public long PersonId { get; init; }
    public Person Person { get; init; }
    public long TeamId { get; init; }
    public Team Team { get; init; }
    public long EventId { get; init; }
    public Event Event { get; init; }
    public DateTime DateJoined { get; init; }

}

