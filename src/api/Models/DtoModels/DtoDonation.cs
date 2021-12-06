namespace Api.DtoModels;

public record DtoDonation
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; init; }
    public long EventID { get; init; }
    public long? TeamID { get; init; }
    public long? PersonID { get; init; }
    public DateTime Date { get; init; }
    public decimal Amount { get; init; }
    public bool IsPending { get; init; } = false;
}
