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
        public Person(string ID, string Name)
        {
            this.ID = ID;
            this.Name = Name;
        }
        public Person(string ID, string Name, string Bio)
        {
            this.ID = ID;
            this.Name = Name;
            this.Bio = Bio;
        }
        public string ID { get; init; }

        public string? AuthID { get; init; }

        public string Name { get; init; }

        public string? Bio { get; init; }
    }

    public static class PersonExtensions
    {
        public static Person WithName(this Person currentPerson, string newName)
        {
            return new Person(currentPerson.ID, newName);
        }

        public static Person WithBio(this Person currentPerson, string newBio)
        {
            return new Person(currentPerson.ID, currentPerson.Name, newBio);
        }
    }
}
