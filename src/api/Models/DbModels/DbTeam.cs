using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public record DbTeam
    {
        public long ID { get; init; }

        public string Description { get; init; }

        public string MainImage {get; init; }

        public long OwnerID { get; init; }
        public DbPerson Owner{ get; init; }

        public long EventID { get; init; }
        public DbEvent Event {get; init;}

        public virtual ICollection<DbRegistration> Registrations { get; init; }
    }
}
