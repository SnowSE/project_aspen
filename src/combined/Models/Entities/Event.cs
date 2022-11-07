namespace Api.Models.Entities;
#nullable enable
public class Event
{
    public Event(long id, string title, string description, DateTime date)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
    }
    public Event(long id, string title, string description, DateTime date, string location)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
        Location = location;
    }
    public Event(long id, string title, string description, DateTime date, string location, string mainImage)
    {
        ID = id;
        Title = title;
        Description = description;
        Date = date;
        Location = location;
        MainImage = mainImage;
    }

    public long ID { get; init; }

    public DateTime Date { get; init; }

    public string? Location { get; init; }

    public string Title { get; init; }

    public string Description { get; init; }

    public string? MainImage { get; init; }
    public decimal DonationTarget { get; init; }
}

public static class EventExtensions
{
    public static Event WithTitleDescriptionAndDate(this Event currentEvent, string newTitle, string newDescription, DateTime newDate)
    {
        return new Event(currentEvent.ID, newTitle, newDescription, newDate);
    }

    public static Event WithLocation(this Event currentEvent, string newLocation)
    {
        return new Event(currentEvent.ID, currentEvent.Title, currentEvent.Description, currentEvent.Date, newLocation);
    }

    public static Event WithPrimaryImageUrl(this Event currentEvent, string newPrimaryImageUrl)
    {
        return new Event(
            currentEvent.ID,
            currentEvent.Description,
            currentEvent.Title,
            currentEvent.Date,
            currentEvent.Location,
            newPrimaryImageUrl);
    }

    public static Event WithDonationTarget(this Event currentEvent, decimal donationTarget)
    {
        return new Event(
            currentEvent.ID,
            currentEvent.Description,
            currentEvent.Title,
            currentEvent.Date,
            currentEvent.Location,
            currentEvent.MainImage)
        {
            DonationTarget = donationTarget
        };
    }
}
