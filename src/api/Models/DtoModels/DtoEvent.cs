using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    //Records don't need the Extension method builder classes because they already
    //have syntax to build them up.
    //var newEvent = oldEvent with {Description = "New Descr"};
    public record DtoEvent
    {
        public long ID { get; init; }
        public DateTime Date { get; init; }
        public string Location { get; init; }
        public string Description { get; init; }
        public string PrimaryImageUrl { get; init; }
    }
}
