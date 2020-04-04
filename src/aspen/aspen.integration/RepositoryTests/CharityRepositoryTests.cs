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
using Aspen.Core.Services;
using System.Threading;

namespace Aspen.Integration.RepositoryTests
{
    public class CharityRepositoryTests
    {
        private int salt;
        private MigrationService migrationService { get; }
        public Charity alexsTurtles { get; set; }

        private CharityRepository charityRepository;

        public CharityRepositoryTests()
        {
            var connString = new ConnectionString(MigrationHelper.ConnectionString);
            migrationService = new MigrationService(connString);
            var t = migrationService.ApplyMigrations(connString);
            t.Wait();

            charityRepository = new CharityRepository(migrationService);
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
                new ConnectionString("Server=notlocalhost; Port=5433; Database=changeme; User Id=changeme; Password=changeme;"),
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
            using(var adminDbConnection = migrationService.GetAdminDbConnection())
            {
                var databases = await adminDbConnection.QueryAsync<string>(
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
            using(var adminDbConnection = migrationService.GetAdminDbConnection())
            {
                var users = await adminDbConnection.QueryAsync<string>(
                    "SELECT usename FROM pg_catalog.pg_user;"
                );
                users.Should().Contain(dbUser);
            }
        }

        [Test]
        public async Task CreatingCharityGeneratesConnectionString()
        {
            var name = "charity_" + alexsTurtles.CharityId.ToString().Replace("-", "");
            var expectedConnectionString = new ConnectionString($"Server=localhost; Port=5433; Database={name}; User Id={name}; Password=redacted; ");

            var acutalTurtles = await charityRepository.GetById(alexsTurtles.CharityId);
            var connectionStringWithoutPassword = acutalTurtles.State.ConnectionString.UpdatePassword("redacted");
            connectionStringWithoutPassword.Should().BeEquivalentTo(expectedConnectionString);
        }

        [Test]
        public async Task CreatingCharityDatabaseRunsMigrations()
        {
            var res = await charityRepository.GetByDomain(alexsTurtles.Domains.First());
            using(var adminDbConnection = migrationService.GetDbConnection(res.State.ConnectionString))
            {
                var tables = await adminDbConnection.QueryAsync<string>(
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
            var connString = new ConnectionString("Server=database; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen;");
            var nonExistantCharity = new Charity(Guid.Empty, "bad charity", "desc", connString, new Domain[] {});
            var result = await charityRepository.Delete(nonExistantCharity);

            result.IsSucccess.Should().BeFalse();
            result.Error.Should().Be("Cannot delete non-existant charity.");
        }
    }
}