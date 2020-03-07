using System;
using System.Text.Json;

namespace Aspen.Core.Models
{
    public class Charity
    {
        public Charity()
        {
            
        }
        public Charity(int charityid, string charityname, string charitysubdomain, string charitydescription)
        {
            this.CharityId = charityid;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.CharitySubDomain = charitysubdomain;
        }
        public Charity(string charityname, string charitysubdomain, string charitydescription)
        {
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.CharitySubDomain = charitysubdomain;
        }

        public int CharityId { get; set; }
        public string CharityName { get; set; }
        public string CharityDescription { get; set; }
        //TODO: validate with regex (only a-z)
        public string CharitySubDomain { get; set; }

        public Charity UpdateCharityName(string newName)
        {
            return new Charity(CharityId, newName, CharitySubDomain, CharityDescription);
        }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }  

    }
}