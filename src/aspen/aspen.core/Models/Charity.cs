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
            // if(domains.Count() == 0) throw new ArgumentException("domains cannot be empty");
        }
        
        [JsonConstructor]
        private Charity(Guid charityid, string charityname, string charitydescription, string connectionstring, IEnumerable<Domain> domains)
        {
            valiateDomains(domains);
            this.CharityId = charityid;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.ConnectionString = new ConnectionString(connectionstring);
            this.Domains = domains;
        }
        public Charity(Guid charityId, string charityname, string charitydescription, ConnectionString connectionstring, IEnumerable<Domain> domains)
        {
            valiateDomains(domains);
            this.CharityId = charityId;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.ConnectionString = connectionstring;
            this.Domains = domains;
        }
        
        private Charity(Guid charityId, string charityname, string charitydescription, string connectionstring)
        {
            this.CharityId = charityId;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.ConnectionString = new ConnectionString(connectionstring);
            this.Domains = new Domain[] {};
        }

        public Guid CharityId { get; }
        public string CharityName { get; }
        public string CharityDescription { get; }
        
        [JsonIgnore]
        public ConnectionString ConnectionString { get; }
        public IEnumerable<Domain> Domains { get; }

        public Charity UpdateCharityName(string newName)
        {
            return new Charity(CharityId, newName, CharityDescription, ConnectionString, Domains);
        }

        internal Charity UpdateConnectionString(ConnectionString charityConnectionString)
        {
            return new Charity(CharityId, CharityName, CharityDescription, charityConnectionString, Domains);
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

        internal Charity AppendDomain(Domain domain)
        {
            return new Charity(CharityId, CharityName, CharityDescription, ConnectionString, Domains.Append(domain));
        }
    }
}