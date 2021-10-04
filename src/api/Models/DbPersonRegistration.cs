using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Models
{
    public class PersonRegistration
    {
        [Key]
        public string ID { get; set; }

        public string PersonID { get; set; }
        public Person Person { get; set; }

        public string RegistrationID { get; set; }
        public Registration Registration { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
