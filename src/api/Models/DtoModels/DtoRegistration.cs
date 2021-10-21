using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public record DtoRegistration
    {
        public long ID { get; init; }

        public DateTime CreationDate { get; init; }

        public bool IsPublic { get; init; }

        public string Nickname { get; init; }

        public long OwnerID { get; init; }

        public long TeamID { get; init; }
    }
}
