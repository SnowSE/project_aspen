using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public record DbPersonRegistration
    {
        public long ID { get; init; }

        public long PersonID { get; init; }
        public DbPerson Person { get; init; }

        public long RegistrationID { get; init; }
        public DbRegistration Registration { get; init; }

        public DateTime CreatedDate { get; init; }
    }
}
