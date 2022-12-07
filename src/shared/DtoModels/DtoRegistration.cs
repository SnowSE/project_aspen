using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

public record DtoRegistration
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }

    public DateTime CreationDate { get; set; }

    public bool IsPublic { get; set; }

    public string? Nickname { get; set; }

    public long OwnerID { get; set; }

    public long TeamID { get; set; }

    public IEnumerable<DtoPersonRegistration>? PersonRegistrations { get; set; }
}
