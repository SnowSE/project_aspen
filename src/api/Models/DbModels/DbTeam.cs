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
        public long ID { get; set; }

        public string Description { get; set; }

        public string MainImage {get; set; }

        public long OwnerID { get; set; }
        public DbPerson Owner{ get; set; }

        public long EventID { get; set; }
        public DbEvent Event {get; set;}

        public virtual ICollection<DbRegistration> Registrations { get; set; }
    }
}
