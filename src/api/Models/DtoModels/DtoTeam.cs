using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public record DtoTeam
    {
        [SwaggerSchema(ReadOnly = true)]
        public long ID { get; init; }

        public string Description { get; init; }

        public string MainImage {get; init; }

        public long OwnerID { get; init; }

        public long EventID { get; init; }
    }
}
