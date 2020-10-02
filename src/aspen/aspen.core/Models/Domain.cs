using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class Domain
    {
        public string CharityDomain { get; }

        [JsonConstructor]
        public Domain(string charityDomain)
        {
            this.CharityDomain = validateDomain(charityDomain);
        }

        //needed for dapper
        private Domain(Guid charityid, string charitydomain)
        {
            this.CharityDomain = validateDomain(charitydomain);
        }

        private static string validateDomain(string charityDomain)
        {
            if (charityDomain.Length > 60)
            {
                throw new ArgumentException("Domain longer than 60 characters");
            }

            charityDomain = charityDomain.ToLower();
            var validDomain = new Regex(@"^[a-z0-9-.]+$");
            if (validDomain.IsMatch(charityDomain) == false)
            {
                throw new ArgumentException("Illegal charaters in domain");
            }

            return charityDomain;
        }

        public override string ToString()
        {
            return CharityDomain;
        }

        public override bool Equals(object obj)
        {
            var objIsNotValid = (obj == null) || !this.GetType().Equals(obj.GetType());
            return objIsNotValid
                ? false
                : ((Domain)obj).CharityDomain == CharityDomain;
        }

        public override int GetHashCode()
        {
            return CharityDomain.GetHashCode();
        }
    }
}