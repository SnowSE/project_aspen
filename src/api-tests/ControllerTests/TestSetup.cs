using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace api_tests.ControllerTests
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
