
using System;

namespace Api.Models.Entities
{
    public class Event
    {
        public long ID { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }
        public string Description { get; set; }


        public string PrimaryImageUrl { get; set; }
    }
}