using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Npgsql;
using NUnit.Framework;

namespace aspen.integration.RepositoryTests
{
    public class CharityRepositoryTests
    {
        private Func<IDbConnection> getDbConnection { get; set; }

        private CharityRepository charityRepository;

        public CharityRepositoryTests()
        {
            getDbConnection = () => new NpgsqlConnection("Server=localhost; Port=5433; Database=Aspen; User ID=Aspen; Password=Aspen;");
            charityRepository = new CharityRepository(getDbConnection);
        }
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task CanAddCharityToDatabase()
        {
            var random = new Random();
            
            var alexsTurtles = new Charity(
                -1,
                "Alex's Turtles" + random.Next(),
                "alexsturtles" + random.Next(),
                "alex likes turtles");
            await charityRepository.CreateCharity(alexsTurtles);
            var all_charities = await charityRepository.GetAll();

            Assert.AreEqual(all_charities.Where(c => c.CharityName == alexsTurtles.CharityName).Count(), 1);
        }
    }
}