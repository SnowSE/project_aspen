using System;

namespace Aspen.Core.Models
{
    public class Team
    {
        public string Name { get; }
        public string Description { get; }

        public Team(string name, string description)
        {
            Name = validateName(name);
            Description = description;
        }

        private string validateName(string name)
        {
            if(name.Length > 60)
                throw new ArgumentException("Team name is greater than 60 characters");
            return name;
        }
    }
}