namespace combined.Models.Entities
{
    public class PaymentFailure
    {
        public long ID { get; set; }
        public long EventID { get; set; }
        public long TeamID { get; set; }
        public long PersonID { get; set; }
        public long Amount { get; set; }
        public string code { get; set; }
        public string decline_code { get; set; }
        public string message { get; set; }

    }
}
