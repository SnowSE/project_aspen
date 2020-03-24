using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class Domain
    {
        private string charitydomain;

        [JsonConstructor]
        public Domain(string charityDomain)
        {
            charityDomain = validateDomain(charityDomain);
            this.charitydomain = charityDomain;
        }

        //needed for dapper
        private Domain(Guid charityid, string charitydomain)
        {
            charitydomain = validateDomain(charitydomain);
            this.charitydomain = charitydomain;
        }

        private static string validateDomain(string charityDomain)
        {
            if (charityDomain.Length > 60)
            {
                throw new ArgumentException("domain longer than 60 characters");
            }

            charityDomain = charityDomain.ToLower();
            var validDomain = new Regex(@"^[a-z0-9-.]+$");
            if (validDomain.IsMatch(charityDomain) == false)
            {
                throw new ArgumentException("illegal charaters in domain");
            }

            return charityDomain;
        }

        public override string ToString()
        {
            return charitydomain;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Domain d = (Domain)obj;
                return charitydomain == d.charitydomain;
            }
        }

        public override int GetHashCode()
        {
            return charitydomain.GetHashCode();
        }
    }
}