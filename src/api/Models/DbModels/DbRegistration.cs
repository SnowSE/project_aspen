using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbRegistration
    {
        public long ID { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsPublic { get; set; }

        public string  Nickname { get; set; }

        public long OwnerID { get; set; }
        public DbPerson Owner { get; set; }

        public long TeamID { get; set; }
        public DbTeam Team {get; set;}

        public virtual ICollection<DbPersonRegistration> PersonRegistrations { get; set; }
    }
}
