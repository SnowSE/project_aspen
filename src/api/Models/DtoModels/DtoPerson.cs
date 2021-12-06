namespace Api.DtoModels;

public record DtoPerson
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; init; }

    public string AuthID { get; init; }

    public string Name { get; init; }

    public string Bio { get; init; }
}
public static class DtoPersonHelpers
{
    public static DtoPerson WithAuthID(this DtoPerson currentPerson, string newAuthId)
    {
        return new DtoPerson
        {
            Name = currentPerson.Name,
            ID = currentPerson.ID,
            Bio = currentPerson.Bio,
            AuthID = newAuthId,
        };
    }
}
