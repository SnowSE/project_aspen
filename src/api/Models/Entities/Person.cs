using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Entities
{
    #nullable enable
    public class Person
    {
        public Person(string ID, string Name){
            this.ID = ID;
            this.Name = Name;
        }
        public string ID { get; init;}

        public string ? AuthID { get; init;}

        public string Name { get; init;}

        public string ? Bio { get; init;}
    }
}
