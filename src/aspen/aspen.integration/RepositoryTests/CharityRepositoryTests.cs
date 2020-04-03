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
using Newtonsoft.Json;
using Npgsql;

namespace Aspen.Integration.RepositoryTests
{
    public class CharityRepositoryTests
    {
        private Func<IDbConnection> getDbConnection { get; set; }
        private int salt;
        public Charity alexsTurtles { get; set; }
        private CharityRepository charityRepository;

        public CharityRepositoryTests()
        {
            MigrationHelper.Migrate();
            getDbConnection = MigrationHelper.GetDbConnection;

            charityRepository = new CharityRepository(getDbConnection);
        }
        
        [SetUp]
        public async Task Setup()
        {
            var random = new Random();
            salt = random.Next();
            alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                "Server=database; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen;",
                new Domain[]{ new Domain(salt+"alexsturtles.com")});
                
            await charityRepository.Create(alexsTurtles);
        }

        [Test]
        public async Task CanAddCharityToDatabase()
        {
            var all_charities = await charityRepository.GetAll();
            Assert.AreEqual(all_charities.Where(c => c.CharityName == alexsTurtles.CharityName).Count(), 1);
            var dbAlexsTurtles = all_charities.Where(c => c.CharityName == alexsTurtles.CharityName).First();
            dbAlexsTurtles.Domains.First().Should().BeEquivalentTo(alexsTurtles.Domains.First());
        }

        [Test]
        public async Task CreatingCharityCreatesCharityDatabase()
        {
            var dbname = "charity_" + alexsTurtles.CharityId.ToString().Replace("-", "");
            using(var dbConnection = getDbConnection())
            {
                var databases = await dbConnection.QueryAsync<string>(
                    @"SELECT datname FROM pg_database
                    WHERE datistemplate = false;"
                );
                databases.Should().Contain(dbname);
            }
        }

        [Test]
        public async Task CreatingCharityCreatesDatabaseUser()
        {
            var dbUser = "charity_" + alexsTurtles.CharityId.ToString().Replace("-", "");
            using(var dbConnection = getDbConnection())
            {
                var users = await dbConnection.QueryAsync<string>(
                    "SELECT usename FROM pg_catalog.pg_user;"
                );
                users.Should().Contain(dbUser);
            }
        }

        [Test]
        public async Task CreatingCharityGeneratesConnectionString()
        {
            var name = "charity_" + alexsTurtles.CharityId.ToString().Replace("-", "");
            var expectedConnectionString = $"Server=localhost; Port=5433; Database={name}; User Id={name};";

            var acutalTurtles = await charityRepository.GetById(alexsTurtles.CharityId);
            var connectionStringWithoutPassword = acutalTurtles.State.ConnectionString.Remove(acutalTurtles.State.ConnectionString.Length - " Password=93627842-c698-4a81-a2a5-e31d48f3c704; ".Length);
            connectionStringWithoutPassword.Should().Be(expectedConnectionString);
        }

        [Test]
        public async Task CreatingCharityDatabaseRunsMigrations()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            using(var dbConnection = new NpgsqlConnection(alexsTurtles.ConnectionString))
            {
                var tables = await dbConnection.QueryAsync<string>(
                    @"SELECT table_name
                    FROM information_schema.tables
                    WHERE table_schema = 'public';"
                );
                tables.Should().Contain("theme");
            }
        }

        [Test]
        public async Task CanUpdateInDatabase()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            alexsTurtles = res.State;

            var newAlexsTurtles = alexsTurtles.UpdateCharityName("Alex's other turtles" + salt);
            await charityRepository.Update(newAlexsTurtles);

            var all_charities = await charityRepository.GetAll();

            all_charities.Where(c => c.CharityName == newAlexsTurtles.CharityName).Count().Should().Be(1);
        }

        [Test]
        public async Task CanGetCharityById()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            alexsTurtles = res.State;

            var statusResult = await charityRepository.GetById(alexsTurtles.CharityId);
            alexsTurtles.Should().BeEquivalentTo(statusResult.State);
        }

        [Test]
        public async Task CanDeleteCharity()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            alexsTurtles = res.State;

            await charityRepository.Delete(alexsTurtles);

            var all_charities = await charityRepository.GetAll();
            all_charities.Where(c => c.ToString() == alexsTurtles.ToString()).Count().Should().Be(0);
        }

        [Test]
        public async Task GettingCharityByIdAlsoGetsDomains()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            var dbCharity = res.State;

            dbCharity.Domains.First().Should().BeEquivalentTo(alexsTurtles.Domains.First());
        }

        [Test]
        public async Task GetById_WhenIdDoesNotExist()
        {
            var result = await charityRepository.GetById(Guid.Empty);
            result.IsSucccess.Should().BeFalse();
            result.Error.Should().Be("Charity id does not exist");
        }

        [Test]
        public async Task GetByDomain_WhenDomainDoesNotExist()
        {
            var result = await charityRepository.GetByDomain(new Domain("NotARealDomain"));
            result.IsSucccess.Should().BeFalse();
            result.Error.Should().Be("Domain does not exist");
        }

        [Test]
        public async Task Delete_HandlesCallWithEmptyCharity()
        {
            var nonExistantCharity = new Charity(Guid.Empty, "bad charity", "desc", "no conn string", new Domain[] {});
            var result = await charityRepository.Delete(nonExistantCharity);

            result.IsSucccess.Should().BeFalse();
            result.Error.Should().Be("Cannot delete non-existant charity.");
        }
    }
}