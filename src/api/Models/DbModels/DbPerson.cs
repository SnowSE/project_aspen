using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DbModels
{
    public class DbPerson
    {
        public long ID { get; set; }
        public string AuthID { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }

        public virtual ICollection<DbPersonRegistration> PersonRegistrations { get; set; }
    }
}
