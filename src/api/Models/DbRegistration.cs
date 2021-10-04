using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Models
{
    public class Registration
    {
        [Key]
        public string ID { get; set; }

        public DateTime CreationDate { get; set; };

        public bool IsPublic { get; set; }

        public string  Nickname { get; set; }

        public string OwnerID { get; set; }

        public string TeamID { get; set; }
        public Team Team {get; set;}

        public virtual ICollection<PersonRegistration> PersonRegistration { get; set; }
    }
}
