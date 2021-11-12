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

        public IEnumerable<DtoPersonRegistration> PersonRegistrations { get; init; }
    }

    public record DtoPersonRegistration
    {
        public long ID { get; init; }

        public long PersonID { get; init; }
        public DtoPerson Person { get; init; }

        public DateTime CreatedDate { get; init; }
    }
}
