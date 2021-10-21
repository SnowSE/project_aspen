using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public record DtoPerson
    {
        public long ID { get; init; }

        public string AuthID { get; init; }

        public string Name { get; init; }

        public string Bio { get; init; }
    }
    public static class DtoPersonHelpers
    {
        public static DtoPerson WithAuthID(this DtoPerson currentPerson, string newAuthId)
        {
            return new DtoPerson {
                Name = currentPerson.Name,
                ID = currentPerson.ID,
                Bio = currentPerson.Bio,
                AuthID = newAuthId,
            };
        }
    }
}
