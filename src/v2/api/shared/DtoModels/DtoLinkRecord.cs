using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

public record DtoLinkRecord
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }
    public long LinkID { get; set; }
    public long? PersonID { get; set; }
    public DateTime Date { get; set; }

}
