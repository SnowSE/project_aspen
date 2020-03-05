using System;

namespace Aspen.Core.Models
{
    public class Charity
    {
        public Charity(int charityid, string charityname, string charitysubdomain, string charitydescription)
        {
            this.CharityId = charityid;
            this.CharityName = charityname;
            this.CharityDescription = charitydescription;
            this.CharitySubDomain = charitysubdomain;
        }

        public int CharityId { get; set; }
        public string CharityName { get; set; }
        public string CharityDescription { get; set; }
        public string CharitySubDomain { get; set; }

    }
}