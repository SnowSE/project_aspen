using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public record DtoEvent
    {
        public long ID { get; init; }

        public DateTime Date { get; init; }

        public string Location { get; init; }
        public string Description { get; init; }

        public string PrimaryImageUrl { get; init; }
    }
    public static class DtoEventHelpers
    {
        public static DtoEvent WithDescription(this DtoEvent previousEvent, string newDescription)
        {
            return new DtoEvent
            {
                ID = previousEvent.ID,
                Date = previousEvent.Date,
                Location = previousEvent.Location,
                Description = newDescription,
                PrimaryImageUrl = previousEvent.PrimaryImageUrl
            };
        }
    }
}
