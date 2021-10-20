using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public class DtoTeam
    {
        public long ID { get; set; }

        public string Description { get; set; }

        public string MainImage {get; set; }

        public long OwnerID { get; set; }

        public long EventID { get; set; }
    }
}
