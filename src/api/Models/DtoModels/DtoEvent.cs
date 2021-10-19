using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DtoModels
{
    public class DtoEvent
    {

        public string ID { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }
        public string Description { get; set; }

        public string PrimaryImageUrl { get; set; }
    }
}
