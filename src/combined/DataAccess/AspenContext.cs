using combined.Models.DbModels;

namespace Api.DataAccess;

public class AspenContext : DbContext
{
    public AspenContext(DbContextOptions<AspenContext> dbContextOptions) : base(dbContextOptions)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<DbDonation>(entity =>
        {
            entity.Property(nameof(DbDonation.IsPledge)).HasDefaultValue(false);
        });

        builder.Entity<DbPersonAndTeamAssociation>()
            .HasIndex(e => new { e.PersonId, e.EventId })
            .IsUnique();

    }

    public DbSet<DbEvent> Events { get; set; }
    public DbSet<DbTeam> Teams { get; set; }
    public DbSet<DbRegistration> Registrations { get; set; }
    public DbSet<DbPersonRegistration> PersonRegistrations { get; set; }
    public DbSet<DbPerson> Persons { get; set; }
    public DbSet<DbDonation> Donations { get; set; }
    public DbSet<DbLink> Links { get; set; }
    public DbSet<DbLinkRecord> LinkRecords { get; set; }
    public DbSet<DbPaymentFailure> PaymentFailures { get; set; }
    public DbSet<DbPersonAndTeamAssociation> PersonAndTeamAssociations { get; set; }

}
