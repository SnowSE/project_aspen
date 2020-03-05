using System;

namespace Aspen.Core.Models
{
    public class Charity
    {
        public Charity(int CharityId, string CharityName, string CharityDescription, string CharitySubDomain)
        {
            this.CharityId = CharityId;
            this.CharityName = CharityName;
            this.CharityDescription = CharityDescription;
            this.CharitySubDomain = CharitySubDomain;
        }
        
        public int CharityId { get; set; }
        public string CharityName { get; set; }
        public string CharityDescription { get; set; }
        public string CharitySubDomain { get; set; }

    }
}