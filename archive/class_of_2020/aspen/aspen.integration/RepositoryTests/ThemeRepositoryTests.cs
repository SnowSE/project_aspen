using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Aspen.Core.Services;
using Aspen.Integration.Helpers;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Aspen.Integration.RepositoryTests
{
    public class ThemeRepositoryTests
    {
        private Func<IDbConnection> getAdminDbConnection;
        private ThemeRepository themeRepository;
        private MigrationService migrationService;

        private Charity kylersPenguins { get; set; }

        public ThemeRepositoryTests()
        {
            var connString = new ConnectionString(MigrationHelper.ConnectionString);
            migrationService = new MigrationService(connString);
            var t = migrationService.ApplyMigrations(connString);
            t.Wait();
            themeRepository = new ThemeRepository(migrationService);
        }

        [SetUp]
        public async Task SetUp()
        {
            var charityRepository = new CharityRepository(migrationService);

            var random = new Random();
            var salt = random.Next();
            var penguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins" + salt,
                "Kyler has a lot of turtles",
                new ConnectionString("Host=database; Port=5432; Database=kylersturtles; Username=Aspen; Password=Aspen;"),
                new Domain[]{ new Domain(salt+"kylerspenguins.com")});
            await charityRepository.Create(penguins);
            var res = await charityRepository.GetByDomain(penguins.Domains.First());
            kylersPenguins = res.State;
        }

        [Test]
        public async Task CanCreateValidTheme()
        {
            var color = "#000000";
            var fontFamily = "Times New Roman";
            var penguinTheme = new Theme(color, color, color, color, fontFamily);

            await themeRepository.Create(penguinTheme, kylersPenguins.ConnectionString);

            var result = await themeRepository.GetByCharity(kylersPenguins);
            result.State.Should().BeEquivalentTo(penguinTheme);
        }

        [Test]
        public async Task CanUpdateTheme()
        {
            var color = "#000000";
            var fontFamily = "Times New Roman";
            var penguinTheme = new Theme(color, color, color, color, fontFamily);
            await themeRepository.Create(penguinTheme, kylersPenguins.ConnectionString);

            var newColor = "#111111";
            await themeRepository.Update(penguinTheme.UpdatePrimaryMainColor(newColor), kylersPenguins.ConnectionString);

            var result = await themeRepository.GetByCharity(kylersPenguins);
            result.State.PrimaryMainColor.Should().Be(newColor);
        }
    }
}