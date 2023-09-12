namespace Api.DbModels;

public record DbRegistration
{
    public long ID { get; init; }

    public DateTime CreationDate { get; init; }

    public bool IsPublic { get; init; }

    public string Nickname { get; init; }

    public long OwnerID { get; init; }
    public DbPerson Owner { get; init; }

    public long TeamID { get; init; }
    public DbTeam Team { get; init; }

    public virtual ICollection<DbPersonRegistration> PersonRegistrations { get; init; }
}
