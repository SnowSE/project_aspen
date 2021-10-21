using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Tests;

namespace Tests
{
    [SetUpFixture]
    public class TestSetup
    {
        [OneTimeSetUp]
        public void MigrateDb()
        {
            var context = TestHelpers.CreateContext();
            context.Database.Migrate();
        }
    }
}
