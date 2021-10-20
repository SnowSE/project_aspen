using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbPersonRegistration
    {
        public long ID { get; set; }

        public long PersonID { get; set; }
        public DbPerson Person { get; set; }

        public long RegistrationID { get; set; }
        public DbRegistration Registration { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
