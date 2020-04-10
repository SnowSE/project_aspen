using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Aspen.Core.Services;
using Aspen.Integration.Helpers;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Integration.RepositoryTests
{
    [Category("Teams")]
    public class TeamRepositoryTests
    {
        private MigrationService migrationService;
        private CharityRepository charityRepository;
        private TeamRepository teamRepository;
        private int salt;
        private Charity alexsTurtles;
        private Team turtlePower;

        public TeamRepositoryTests()
        {
            var connString = new ConnectionString(MigrationHelper.ConnectionString);
            migrationService = new MigrationService(connString, secure: false);
            var t = migrationService.ApplyMigrations(connString);
            t.Wait();

            charityRepository = new CharityRepository(migrationService);
            teamRepository = new TeamRepository(migrationService);
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
                new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;"),
                new Domain[]{ new Domain(salt+"alexsturtles.com")}
            );
                
            await charityRepository.Create(alexsTurtles);
            alexsTurtles = (await charityRepository.GetById(alexsTurtles.CharityId)).State;

            turtlePower = new Team(
                Guid.NewGuid(),
                "Team Turtle Power" + salt,
                "TMNT"
            );
            await teamRepository.Create(turtlePower, alexsTurtles);
        }

        [Test]
        public async Task CanCreateTeam()
        {
            var res = await teamRepository.GetByCharity(alexsTurtles);
            res.State.Should().ContainEquivalentOf(turtlePower);
        }

        [Test]
        public async Task CanDeleteTeam()
        {
            await teamRepository.Delete(turtlePower, alexsTurtles);
            var res = await teamRepository.GetByCharity(alexsTurtles);
            res.State.Should().NotContain(turtlePower);
        }

        [Test]
        public async Task CanUpdateTeam()
        {
            var betterTurtlePower = turtlePower.UpdateDescription("Better turtles with more power!");
            await teamRepository.Update(betterTurtlePower, alexsTurtles);
            var res = await teamRepository.GetByCharity(alexsTurtles);
            res.State.Should().ContainEquivalentOf(betterTurtlePower);
            res.State.Should().NotContain(turtlePower);
        }
    }
}