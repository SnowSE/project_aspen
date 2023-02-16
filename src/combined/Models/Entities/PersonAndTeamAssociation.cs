namespace Api.Models.Entities;

public class PersonAndTeamAssociation
{
    public int Id { get; init; }
    public int PersonId { get; init; }
    public Person Person { get; init; }
    public int TeamId { get; init; }
    public Team Team { get; init; }
    public int EventId { get; set; }
    public Event Event { get; set; }

    public DateTime DateJoined { get; set; }

}

