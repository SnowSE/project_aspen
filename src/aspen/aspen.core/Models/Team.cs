using System;

namespace Aspen.Core.Models
{
    public class Team
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Description { get; }

        public Team(Guid id, string name, string description)
        {
            Id = id;
            Name = validateName(name);
            Description = description;
        }

        private string validateName(string name)
        {
            if(name.Length > 60)
                throw new ArgumentException("Team name is greater than 60 characters");
            return name;
        }

        public Team UpdateDescription(string newDescription)
        {
            return new Team(Id, Name, newDescription);
        }

        public Team UpdateId(Guid id)
        {
            return new Team(id, Name, Description);
        }
    }
}