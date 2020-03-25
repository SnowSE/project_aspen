using System.Threading.Tasks;
using Aspen.Core.Repositories;
using Aspen.Api.Controllers;
using Moq;
using NUnit.Framework;
using Aspen.Core.Models;
using System;
using FluentAssertions;
using Aspen.Api.Models;

namespace Aspen.Tests.ControllerTests
{
    public class CharityControllerTests
    {
        private Mock<ICharityRepository> charityRepoMoq;
        private Mock<IThemeRepository> themeRepoMoq;
        private CharityController charityController;

        [SetUp]
        public void Setup()
        {
            charityRepoMoq = new Mock<ICharityRepository>();
            themeRepoMoq = new Mock<IThemeRepository>();
            charityController = new CharityController(charityRepoMoq.Object, themeRepoMoq.Object);

        }

        [Test]
        public async Task CanGetCharityByDomain()
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var kylersPenguins = new Charity(
                Guid.NewGuid(), "Kyler's Penguins", "kyler has a lot of penguins", new Domain[] { penguinDomain });

            charityRepoMoq
                .Setup(sr => sr.GetByDomain(penguinDomain))
                .ReturnsAsync(kylersPenguins);

            var response = await charityController.Get(penguinDomain.ToString());
            response.Status.Should().Be(StatusReturn.StatusConstants.Success);

            var actualCharity = (Charity)response.Data;
            actualCharity.Should().BeEquivalentTo(kylersPenguins);
        }

        [Test]
        public async Task CanGetThemeByCharityId()
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var kylersPenguins = new Charity(
                Guid.NewGuid(), "Kyler's Penguins", "kyler has a lot of penguins", new Domain[] { penguinDomain });
            
            var color = "#000000";
            var fontFamily = "Times";
            var penguinTheme = new Theme(kylersPenguins.CharityId, color, color, color, color, fontFamily);

            themeRepoMoq
                .Setup(tr => tr.GetByCharityId(penguinTheme.CharityId))
                .ReturnsAsync(penguinTheme);
            
            var response = await charityController.GetTheme(penguinTheme.CharityId);
            response.Status.Should().Be(StatusReturn.StatusConstants.Success);

            var actualTheme = (Theme) response.Data;
            actualTheme.Should().BeEquivalentTo(penguinTheme);
        }
    }
}