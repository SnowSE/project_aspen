using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Aspen.Api.DatabaseModels
{
    public class Event
    {
        [Key]
        public string ID { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }
        public string Description { get; set; }


        public string PrimaryImageUrl { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
    }
}
