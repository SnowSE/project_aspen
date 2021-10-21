using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public record DbPerson
    {
        public long ID { get; init; }
        public string AuthID { get; init; }
        public string Name { get; init; }
        public string Bio { get; init; }

        public virtual ICollection<DbPersonRegistration> PersonRegistrations { get; init; }
    }
}
