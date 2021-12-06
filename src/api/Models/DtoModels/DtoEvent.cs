namespace Api.DtoModels;

//Records don't need the Extension method builder classes because they already
//have syntax to build them up.
//var newEvent = oldEvent with {Description = "New Descr"};
public record DtoEvent
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; init; }
    public DateTime Date { get; init; }
    public string Title { get; init; }
    public string Location { get; init; }
    public string Description { get; init; }
    public string PrimaryImageUrl { get; init; }
    public decimal DonationTarget { get; init; }
}
