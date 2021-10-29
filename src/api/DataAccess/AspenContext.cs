
using Api.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess
{
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
        }

        public DbSet<DbPageData> PageData { get; set; }
        public DbSet<DbEvent> Events { get; set; }
        public DbSet<DbTeam> Teams { get; set; }
        public DbSet<DbRegistration> Registrations { get; set; }
        public DbSet<DbPersonRegistration> PersonRegistrations { get; set; }
        public DbSet<DbPerson> Persons { get; set; }
    }
}