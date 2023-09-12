namespace Api.Models.Entities;
#nullable enable
public class Event
{
    public Event(long id, string title, string description, DateTime date, bool isArchived)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
        IsArchived = isArchived;
    }
    public Event(long id, string title, string description, DateTime date, string location, bool isArchived)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
        Location = location;
        IsArchived = isArchived;
    }
    public Event(long id, string title, string description, DateTime date, string location, string mainImage, bool isArchived)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
        Location = location;
        MainImage = mainImage;
        IsArchived = isArchived;
    }

    public long ID { get; init; }

    public DateTime Date { get; init; }

    public string? Location { get; init; }

    public string Title { get; init; }

    public string Description { get; init; }

    public string? MainImage { get; init; }
    public decimal DonationTarget { get; init; }
    public bool IsArchived { get; init; }

}

public static class EventExtensions
{
    public static Event WithTitleDescriptionAndDate(this Event currentEvent, string newTitle, string newDescription, DateTime newDate, bool archived)
    {
        return new Event(currentEvent.ID, newTitle, newDescription, newDate, archived);
    }

    public static Event WithLocation(this Event currentEvent, string newLocation, bool archived)
    {
        return new Event(currentEvent.ID, currentEvent.Title, currentEvent.Description, currentEvent.Date, newLocation, archived);
    }

    public static Event WithPrimaryImageUrl(this Event currentEvent, string newPrimaryImageUrl)
    {
        return new Event(
            currentEvent.ID,
            currentEvent.Description,
            currentEvent.Title,
            currentEvent.Date,
            currentEvent.Location,
            newPrimaryImageUrl,
            currentEvent.IsArchived);
    }

    public static Event WithDonationTarget(this Event currentEvent, decimal donationTarget)
    {
        return new Event(
            currentEvent.ID,
            currentEvent.Description,
            currentEvent.Title,
            currentEvent.Date,
            currentEvent.Location,
            currentEvent.MainImage,
            currentEvent.IsArchived)
        {
            DonationTarget = donationTarget
        };
    }
}
