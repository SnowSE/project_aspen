using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Entities
{
    public class Team
    {

        public long ID { get; init; }

        public string Description { get; init; }

        public string MainImage { get; init; }

        public long OwnerID { get; init; }
        public Person Owner { get; init; }

        public long EventID { get; init; }
        public Event Event { get; init; }
    }
}