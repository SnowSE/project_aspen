using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Dapper;
using FluentAssertions;
using NUnit.Framework;
using Aspen.Integration.Helpers;

namespace Aspen.Integration.RepositoryTests
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
            MigrationHelper.Migrate();
            getDbConnection = MigrationHelper.GetDbConnection;

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
            var salt = + random.Next();
            var alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                new Domain[]{ new Domain(salt+"alexsturtles.com")});

            await charityRepository.Create(alexsTurtles);
            var all_charities = await charityRepository.GetAll();

            Assert.AreEqual(all_charities.Where(c => c.CharityName == alexsTurtles.CharityName).Count(), 1);
        }

        [Test]
        public async Task CanUpdateInDatabase()
        {
            var random = new Random();
            var salt = + random.Next();
            var alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                new Domain[]{ new Domain(salt+"alexsturtles.com")});
            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByDomain(alexsTurtles.Domains.First());

            var newAlexsTurtles = alexsTurtles.UpdateCharityName("Alex's other turtles" + salt);
            await charityRepository.Update(newAlexsTurtles);

            var all_charities = await charityRepository.GetAll();

            all_charities.Where(c => c.CharityName == newAlexsTurtles.CharityName).Count().Should().Be(1);
        }

        [Test]
        public async Task CanGetCharityById()
        {
            var random = new Random();
            var salt = + random.Next();
            var alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                new Domain[]{ new Domain(salt+"alexsturtles.com")});

            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByDomain(alexsTurtles.Domains.First());

            var alexsTurtlesById = await charityRepository.GetById(alexsTurtles.CharityId);
            alexsTurtles.Should().BeEquivalentTo(alexsTurtlesById);
        }

        [Test]
        public async Task CanDeleteCharity()
        {
            var random = new Random();
            var salt = + random.Next();
            var alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                new Domain[]{ new Domain(salt+"alexsturtles.com")});

            await charityRepository.Create(alexsTurtles);
            alexsTurtles = await charityRepository.GetByDomain(alexsTurtles.Domains.First());

            await charityRepository.Delete(alexsTurtles);

            var all_charities = await charityRepository.GetAll();
            all_charities.Where(c => c.ToString() == alexsTurtles.ToString()).Count().Should().Be(0);
        }
    }
}