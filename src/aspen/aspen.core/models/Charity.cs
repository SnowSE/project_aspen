using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class Charity
    {
        private void valiateDomains(IEnumerable<Domain> domains)
        {
            if(domains == null) throw new ArgumentException("domains cannot be null");
            if(domains.Count() == 0) throw new ArgumentException("domains cannot be empty");
        }
        
        [JsonConstructor]
        public Charity(Guid charityid, string charityname, string charitydescription, IEnumerable<Domain> domains)
        {
            valiateDomains(domains);
            this.CharityId = charityid;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.Domains = domains;
        }
        public Charity(Guid charityId, string charityname, string charitydescription)
        {
            this.CharityId = charityId;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.Domains = new Domain[] {};
        }

        public Guid CharityId { get; }
        public string CharityName { get; }
        public string CharityDescription { get; }
        public IEnumerable<Domain> Domains { get; }

        public Charity UpdateCharityName(string newName)
        {
            return new Charity(CharityId, newName, CharityDescription, Domains);
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

        internal Charity AppendDomain(Domain domain)
        {
            return new Charity(CharityId, CharityName, CharityDescription, Domains.Append(domain));
        }
    }
}