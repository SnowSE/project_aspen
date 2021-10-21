using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Entities
{
#nullable enable
    public class Event
    {
        public Event(long id, string description, DateTime date)
        {
            ID = id;
            Description = description;
            Date = date;
        }
        public Event(long id, string description, DateTime date, string location)
        {
            ID = id;
            Description = description;
            Date = date;
            Location = location;
        }
        public Event(long id, string description, DateTime date, string location, string primaryImageUrl)
        {
            ID = id;
            Description = description;
            Date = date;
            Location = location;
            PrimaryImageUrl = primaryImageUrl;
        }

        public long ID { get; init; }

        public DateTime Date { get; init; }

        public string? Location { get; init; }

        public string Description { get; init; }

        public string? PrimaryImageUrl { get; init; }
    }

    public static class EventExtensions
    {
        public static Event WithDescriptionAndDate(this Event currentEvent, string newDescription, DateTime newDate)
        {
            return new Event(currentEvent.ID, newDescription, newDate);
        }

        public static Event WithLocation(this Event currentEvent, string newLocation)
        {
            return new Event(currentEvent.ID, currentEvent.Description, currentEvent.Date, newLocation);
        }

        public static Event WithPrimaryImageUrl(this Event currentEvent, string newPrimaryImageUrl)
        {
            return new Event(currentEvent.ID, currentEvent.Description, currentEvent.Date, currentEvent.Location, newPrimaryImageUrl);
        }
    }
}
