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
        public Person(long id, string name)
        {
            ID = id;
            Name = name;
        }
        public Person(long id, string name, string bio)
        {
            ID = id;
            Name = name;
            Bio = bio;
        }
        public long ID { get; init; }

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

        public static Person WithAuthId(this Person currentPerson, string newAuthID)
        {
            return new Person(currentPerson.ID, currentPerson.Name) { AuthID = newAuthID };
        }
    }
}
