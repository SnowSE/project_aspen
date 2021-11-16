using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Entities
{
    public class Registration
    {
        public long ID { get; init; }

        public DateTime CreationDate { get; init; }

        public bool IsPublic { get; init; }

        public string Nickname { get; init; }

        public long OwnerID { get; init; }

        public long TeamID { get; init; }

        public IEnumerable<PersonRegistration> PersonRegistrations { get; init; }

    }

    public record PersonRegistration
    {
        public long ID { get; init; }

        public long PersonID { get; init; }
        public Person Person { get; init; }

        public long RegistrationID { get; init; }
        public Registration Registration { get; init; }

        public DateTime CreatedDate { get; init; }
    }
}