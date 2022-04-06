using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace shared.DtoModels;

public record DtoTeam
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public string MainImage { get; set; }
    public long OwnerID { get; set; }
    public long EventID { get; set; }
    public decimal DonationTarget { get; set; }
}
