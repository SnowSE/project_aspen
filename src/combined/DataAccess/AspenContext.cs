namespace Api.DataAccess;

public class AspenContext : DbContext
{
    public AspenContext(DbContextOptions<AspenContext> dbContextOptions) : base(dbContextOptions)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<DbPageData>(entity =>
        {
            entity.HasIndex(e => e.Key).IsUnique();
        });

        builder.Entity<DbDonation>(entity =>
        {
            entity.Property(nameof(DbDonation.IsPledge)).HasDefaultValue(false);
        });
    }

    public DbSet<DbPageData> PageData { get; set; }
    public DbSet<DbEvent> Events { get; set; }
    public DbSet<DbTeam> Teams { get; set; }
    public DbSet<DbRegistration> Registrations { get; set; }
    public DbSet<DbPersonRegistration> PersonRegistrations { get; set; }
    public DbSet<DbPerson> Persons { get; set; }
    public DbSet<DbDonation> Donations { get; set; }
    public DbSet<DBLink> Links { get; set; }
}
