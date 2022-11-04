using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

//Records don't need the Extension method builder classes because they already
//have syntax to build them up.
//var newEvent = oldEvent with {Description = "New Descr"};
public record DtoEvent
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }
    public DateTime Date { get; set; }
    public string Title { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public string MainImage { get; set; }
    public decimal DonationTarget { get; set; }
}
