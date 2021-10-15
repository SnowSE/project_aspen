using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    #nullable enable
    public record DtoPerson
    {
        public DtoPerson(string Name){
            this.Name = Name;
        }
        public string ? ID { get; init;}

        public string ? AuthID { get; init;}

        public string Name { get; init;}

        public string ? Bio { get; init;}
    }
}
