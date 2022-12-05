namespace Api.Models.Entities;

public class Registration
{
    public long ID { get; init; }

    public DateTime CreationDate { get; init; }

    public bool IsPublic { get; init; }

    public string? Nickname { get; init; }

    public long OwnerID { get; init; }

    public long TeamID { get; init; }

    public IEnumerable<PersonRegistration> PersonRegistrations { get; init; }

}
