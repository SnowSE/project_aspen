namespace combined.Models.DbModels
{
    public record DbPaymentFailure
    {
        public long ID { get; init; }
        public long EventID { get; init; }
        public DbEvent Event { get; init; }
        public long? PersonID { get; init; }
        public DbPerson Person { get; init; }
        public long Amount { get; init; }
        public string Code { get; init; }
        public string? Decline_Code { get; init; }
        public string Message { get; init; }

    }
}
