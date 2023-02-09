using Swashbuckle.AspNetCore.Annotations;


namespace shared.DtoModels
{
    public record DtoPaymentFailure
    {
        [SwaggerSchema(ReadOnly = true)]
        public long ID { get; set; }
        public long EventID { get; set; }
        public long? PersonID { get; set; }
        public long Amount { get; set; }
        public string Code { get; set; }
        public string Decline_code { get; set; }
        public string Message { get; set; }

    }
}
