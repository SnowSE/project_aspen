using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Aspen.Integration.Helpers;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Aspen.Integration.RepositoryTests
{
    public class ThemeRepositoryTests
    {
        private Func<IDbConnection> getDbConnection;
        private ThemeRepository themeRepository;
        private Charity kylersPenguins { get; set; }

        public ThemeRepositoryTests()
        {
            MigrationHelper.Migrate();
            getDbConnection = MigrationHelper.GetDbConnection;
            themeRepository = new ThemeRepository(getDbConnection);
        }

        [SetUp]
        public async Task SetUp()
        {
            var charityRepository = new CharityRepository(getDbConnection);

            var random = new Random();
            var salt = random.Next();
            var penguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins" + salt,
                "Kyler has a lot of turtles",
                "no conn string",
                new Domain[]{ new Domain(salt+"kylerspenguins.com")});
            await charityRepository.Create(penguins);
            var res = await charityRepository.GetByDomain(penguins.Domains.First());
            kylersPenguins = res.State;
        }

    //     [Test]
    //     public async Task CanCreateValidTheme()
    //     {
    //         var color = "#000000";
    //         var fontFamily = "Times New Roman";
    //         var penguinTheme = new Theme(kylersPenguins.CharityId, color, color, color, color, fontFamily);

    //         await themeRepository.Create(penguinTheme);

    //         var result = await themeRepository.GetByCharityId(kylersPenguins.CharityId);
    //         result.State.Should().BeEquivalentTo(penguinTheme);
    //     }

    //     [Test]
    //     public async Task CanUpdateTheme()
    //     {
    //         var color = "#000000";
    //         var fontFamily = "Times New Roman";
    //         var penguinTheme = new Theme(kylersPenguins.CharityId, color, color, color, color, fontFamily);
    //         await themeRepository.Create(penguinTheme);

    //         var newColor = "#111111";
    //         await themeRepository.Update(penguinTheme.UpdatePrimaryMainColor(newColor));

    //         var result = await themeRepository.GetByCharityId(kylersPenguins.CharityId);
    //         result.State.PrimaryMainColor.Should().Be(newColor);
    //     }

    //     [Test]
    //     public async Task CanDeleteTheme()
    //     {
    //         var color = "#000000";
    //         var fontFamily = "Times New Roman";
    //         var penguinTheme = new Theme(kylersPenguins.CharityId, color, color, color, color, fontFamily);
    //         await themeRepository.Create(penguinTheme);

    //         await themeRepository.Delete(penguinTheme.CharityId);

    //         var allThemes = await themeRepository.GetAll();
    //         allThemes.Contains(penguinTheme).Should().BeFalse();
    //     }
    }
}