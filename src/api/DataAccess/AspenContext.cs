using Aspen.Api.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace Aspen.Api
{
    public class AspenContext : DbContext
    {
        public AspenContext(DbContextOptions<AspenContext> dbContextOptions) : base(dbContextOptions)
        {            
        }

        public DbSet<PageData> PageData{get;set;}

        public DbSet<Event> Events { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<PersonRegistration> PersonRegistrations { get; set; }
        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<PersonRegistration>()
                .HasOne(r => r.Registration)
                .WithMany(pr => pr.PersonRegistration)
                .HasForeignKey(r => r.RegistrationID);

            modelBuilder.Entity<PersonRegistration>()
                .HasOne(p => p.Person)
                .WithMany(pr => pr.PersonRegistration)
                .HasForeignKey(p => p.PersonID);
        }
    }
}