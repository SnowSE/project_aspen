using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbEvent
    {
        public long ID { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }
        public string Description { get; set; }


        public string PrimaryImageUrl { get; set; }

        public virtual ICollection<DbTeam> Teams { get; set; }
    }
}
