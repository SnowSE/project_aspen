namespace Api.DbModels;

public record DbPerson
{
    public long ID { get; init; }
    public Team Team { get; init; }
    public long TeamID { get; init; }
    public string AuthID { get; init; }
    public string Name { get; init; }
    public string? Bio { get; init; }

    public virtual ICollection<DbPersonRegistration> PersonRegistrations { get; init; }
}
