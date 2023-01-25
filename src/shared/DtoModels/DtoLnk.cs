using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace shared.DtoModels;

public record DtoLink
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }
    public long EventID { get; set; }
    public long? PersonID { get; set; }
    public DateTime Date { get; set; }
    public string LinkURL { get; set; }
}
