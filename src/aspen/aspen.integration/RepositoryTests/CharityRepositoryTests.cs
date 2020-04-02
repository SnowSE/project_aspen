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
            var nonExistantCharity = new Charity(Guid.Empty, "bad charity", "desc", new Domain[] {});
            var result = await charityRepository.Delete(nonExistantCharity);

            result.IsSucccess.Should().BeFalse();
            result.Error.Should().Be("Cannot delete non-existant charity.");
        }
    }
}