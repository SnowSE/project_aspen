using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

public record DtoPerson
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }

    public string AuthID { get; set; }

    public string Name { get; set; }

    public string? Bio { get; set; }
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
