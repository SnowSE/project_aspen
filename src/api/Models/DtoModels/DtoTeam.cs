namespace Api.DtoModels;

public record DtoTeam
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; init; }
    [Required]
    public string Name { get; set; }
    public string Description { get; init; }
    public string MainImage { get; init; }
    public long OwnerID { get; init; }
    public long EventID { get; init; }
    public decimal DonationTarget { get; init; }
}
