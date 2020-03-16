using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Dapper;
using FluentAssertions;
using Npgsql;
using NUnit.Framework;

namespace aspen.integration.RepositoryTests
{
    public class CharityRepositoryTests
    {
        private Func<IDbConnection> getDbConnection { get; set; }

        private CharityRepository charityRepository;
        private void createTables()
        {
            var createTableSqlPath = Path.Combine(Directory.GetCurrentDirectory(), "../../../../pgsql/00-tables.sql");
            var createTablesSql = File.ReadAllText(createTableSqlPath);
            using(var dbConnection = getDbConnection())
            {
                dbConnection.Execute(createTablesSql);
            }        
        }

        public CharityRepositoryTests()
        {
            var defaultConnectionString = "Server=localhost; Port=5433; Database=Aspen; User ID=Aspen; Password=Aspen;";
            var connectionString = Environment.GetEnvironmentVariable("INTEGRATION_TEST_CONNECTION")??defaultConnectionString;
            getDbConnection = () => new NpgsqlConnection(connectionString);

            createTables(); //should be moved to a startup module for all repository tests
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
            await charityRepository.Create(alexsTurtles);
            var all_charities = await charityRepository.GetAll();

            Assert.AreEqual(all_charities.Where(c => c.CharityName == alexsTurtles.CharityName).Count(), 1);
        }

        [Test]
        public async Task CanUpdateInDatabase()
        {
            var random = new Random();
            
            var alexsTurtles = new Charity(
                "Alex's Turtles" + random.Next(),
                "alexsturtles" + random.Next(),
                "alex likes turtles");
            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByName(alexsTurtles.CharityName);

            var newAlexsTurtles = alexsTurtles.UpdateCharityName("Alex's other turtles" + random.Next());
            await charityRepository.Update(newAlexsTurtles);

            var all_charities = await charityRepository.GetAll();

            all_charities.Where(c => c.CharityName == newAlexsTurtles.CharityName).Count().Should().Be(1);
        }

        [Test]
        public async Task CanGetCharityById()
        {
            var random = new Random();
            
            var alexsTurtles = new Charity(
                "Alex's Turtles" + random.Next(),
                "alexsturtles" + random.Next(),
                "alex likes turtles");
            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByName(alexsTurtles.CharityName);

            var alexsTurtlesById = await charityRepository.GetById(alexsTurtles.CharityId);
            alexsTurtles.Should().BeEquivalentTo(alexsTurtlesById);
        }

        [Test]
        public async Task CanDeleteCharity()
        {
            var random = new Random();
            
            var alexsTurtles = new Charity(
                "Alex's Turtles" + random.Next(),
                "alexsturtles" + random.Next(),
                "alex likes turtles");
            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByName(alexsTurtles.CharityName);

            await charityRepository.Delete(alexsTurtles);

            var all_charities = await charityRepository.GetAll();
            all_charities.Where(c => c.ToString() == alexsTurtles.ToString()).Count().Should().Be(0);
        }
    }
}