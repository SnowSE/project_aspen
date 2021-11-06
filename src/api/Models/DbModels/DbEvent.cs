using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public record DbEvent
    {
        public long ID { get; init; }

        public DateTime Date { get; init; }
        public string Title { get; set; }
        public string Location { get; init; }
        public string Description { get; init; }

        public string PrimaryImageUrl { get; init; }

        public virtual ICollection<DbTeam> Teams { get; init; }
    }
}
