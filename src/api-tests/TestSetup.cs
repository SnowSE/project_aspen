using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Threading.Tasks;
using Tests;

namespace Tests
{
    [SetUpFixture]
    public class TestSetup
    {
        [OneTimeSetUp]
        public void MigrateDbAsync()
        {
            var context = TestHelpers.CreateContext();
            context.Database.Migrate();
        }
    }
}
