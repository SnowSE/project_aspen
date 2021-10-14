using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbPersonRegistration
    {
        [Key]
        public string ID { get; set; }

        public string PersonID { get; set; }
        public DbPerson Person { get; set; }

        public string RegistrationID { get; set; }
        public DbRegistration Registration { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
