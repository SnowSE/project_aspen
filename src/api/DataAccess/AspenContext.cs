using Aspen.Api.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Aspen.Api.DataAccess
{
    public class AspenContext : DbContext
    {
        public AspenContext(DbContextOptions<AspenContext> dbContextOptions) : base(dbContextOptions)
        {            
        }

        public DbSet<DbPageData> PageData{get;set;}

        public DbSet<DbEvent> Events { get; set; }
        public DbSet<DbTeam> Teams { get; set; }
        public DbSet<DbRegistration> Registrations { get; set; }
        public DbSet<DbPersonRegistration> PersonRegistrations { get; set; }
        public DbSet<DbPerson> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}