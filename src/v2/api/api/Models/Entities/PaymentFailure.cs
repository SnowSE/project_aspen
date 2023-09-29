using System.ComponentModel.DataAnnotations.Schema;


namespace Api.Models.Entities
{
    public class PaymentFailure
    {
        public long ID { get; init; }
        public long EventID { get; init; }
        public long? PersonID { get; init; }
        public long Amount { get; init; }
        public string Code { get; init; }
        public string? Decline_Code { get; init; }
        public string Message { get; init; }

    }
}