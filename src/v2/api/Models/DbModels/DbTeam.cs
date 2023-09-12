namespace Api.DbModels;

public record DbTeam
{
    public long ID { get; init; }
    [Required, MaxLength(128)]
    public string Name { get; init; }
    public string Description { get; init; }
    public string MainImage { get; init; }
    public string WelcomeMessage { get; init; }
    public long OwnerID { get; init; }
    public DbPerson Owner { get; init; }
    public long EventID { get; init; }
    public DbEvent Event { get; init; }
    public decimal DonationTarget { get; init; }

    public bool IsArchived { get; init; }

    public List<DbDonation> Donations { get; init; }
}
