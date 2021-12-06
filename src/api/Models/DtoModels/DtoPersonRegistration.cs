namespace Api.DtoModels;

public record DtoPersonRegistration
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; init; }

    public long PersonID { get; init; }
    public DtoPerson Person { get; init; }

    public DateTime CreatedDate { get; init; }
}
