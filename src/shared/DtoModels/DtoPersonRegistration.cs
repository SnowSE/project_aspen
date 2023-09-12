using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

public record DtoPersonRegistration
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }

    public long PersonID { get; set; }
    public DtoPerson? Person { get; set; }

    public DateTime CreatedDate { get; set; }
}