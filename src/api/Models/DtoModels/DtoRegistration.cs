using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public class DtoRegistration
    {
        public long ID { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsPublic { get; set; }

        public string  Nickname { get; set; }

        public long OwnerID { get; set; }

        public long TeamID { get; set; }
    }
}
