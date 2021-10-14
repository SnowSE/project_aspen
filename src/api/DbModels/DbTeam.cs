using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbTeam
    {
        [Key]
        public string ID { get; set; }

        public string Description { get; set; }

        public string MainImage {get; set; }

        public string OwnerID { get; set; }

        public string EventID { get; set; }
        public DbEvent Event {get; set;}

        public virtual ICollection<DbRegistration> Registrations { get; set; }
    }
}
