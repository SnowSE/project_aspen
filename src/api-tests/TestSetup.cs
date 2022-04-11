using Microsoft.EntityFrameworkCore;
using Npgsql;
using TechTalk.SpecFlow.Infrastructure;

namespace Tests
{
    [SetUpFixture]
    public class TestSetup
    {
        public ISpecFlowOutputHelper OutputHelper { get; set; }

        [OneTimeSetUp]
        public void MigrateDbAsync()
        {
            var context = TestHelpers.CreateContext();
            try
            {
                context.Database.Migrate();
            }
            catch (NpgsqlException n)
            {
                throw new Exception("Looks like your connection to the database was refused.  Try getting into the dev-resources folder and running the start-localdb.ps1 script.", n);
            }
        }
    }
}
