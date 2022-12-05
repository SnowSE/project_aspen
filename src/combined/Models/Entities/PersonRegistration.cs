namespace Api.Models.Entities;

public record PersonRegistration
{
    public long ID { get; init; }

    public long PersonID { get; init; }
    public Person Person { get; init; }

    public long RegistrationID { get; init; }
    public Registration Registration { get; init; }

    public DateTime CreatedDate { get; init; }
}
