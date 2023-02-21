namespace Api.Models.Entities;

public class PersonTeamAssociation
{
    public int Id { get; init; }
    public long PersonId { get; init; }
    public long TeamId { get; init; }
    public long EventId { get; set; }
    public DateTime DateJoined { get; set; }

}

