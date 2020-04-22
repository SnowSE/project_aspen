using System.Threading.Tasks;
using Aspen.Core.Repositories;
using Aspen.Api.Controllers;
using Moq;
using NUnit.Framework;
using Aspen.Core.Models;
using System;
using FluentAssertions;
using Aspen.Core;
using Aspen.Api.Http;

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
            var connString = new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            var kylersPenguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins",
                "kyler has a lot of penguins",
                connString,
                new Domain[] { penguinDomain });

            charityRepoMoq
                .Setup(sr => sr.GetByDomain(penguinDomain))
                .ReturnsAsync(Result<Charity>.Success(kylersPenguins));

            var response = await charityController.Get(penguinDomain.ToString());
            response.Status.Should().Be(ApiResult.StatusConstants.Success);

            var actualCharity = (Charity)response.Data;
            actualCharity.Should().BeEquivalentTo(kylersPenguins);
        }

        [Test]
        public async Task CanGetCharityById()
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var connString = new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            var kylersPenguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins",
                "kyler has a lot of penguins",
                connString,
                new Domain[] { penguinDomain });

            charityRepoMoq
                .Setup(sr => sr.GetById(kylersPenguins.CharityId))
                .ReturnsAsync(Result<Charity>.Success(kylersPenguins));

            var response = await charityController.Get(kylersPenguins.CharityId);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);

            var actualCharity = (Charity)response.Data;
            actualCharity.Should().BeEquivalentTo(kylersPenguins);
        }

        [Test]
        public async Task CanGetThemeByCharityId()
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var connString = new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            var kylersPenguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins",
                "kyler has a lot of penguins",
                connString,
                new Domain[] { penguinDomain });

            var color = "#000000";
            var fontFamily = "Times";
            var penguinTheme = new Theme(color, color, color, color, fontFamily);

            charityRepoMoq
                .Setup(cr => cr.GetById(kylersPenguins.CharityId))
                .ReturnsAsync(Result<Charity>.Success(kylersPenguins));
            themeRepoMoq
                .Setup(tr => tr.GetByCharity(kylersPenguins))
                .ReturnsAsync(Result<Theme>.Success(penguinTheme));

            var response = await charityController.GetTheme(kylersPenguins.CharityId);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);

            var actualTheme = (Theme)response.Data;
            actualTheme.Should().BeEquivalentTo(penguinTheme);
        }

        [Test]
        public async Task ReturnsFailureIfDomainDoesntExist()
        {
            var error = "Domain does not exist";
            charityRepoMoq
                .Setup(cr => cr.GetByDomain(It.IsAny<Domain>()))
                .ReturnsAsync(Result<Charity>.Failure(error));

            var res = await charityController.Get("baddomain");
            res.Status.Should().Be(ApiResult.StatusConstants.Failed);
            res.Data.Should().Be(error);
        }

        [Test]
        public async Task HandelsBadDomainsGracefully()
        {
            var statusResult = await charityController.Get("invalid***///**/\\domain");
            statusResult.Status.Should().Be(ApiResult.StatusConstants.Failed);
            statusResult.Data.Should().Be("Illegal charaters in domain");
        }

        [Test]
        public async Task HandleWrongCharityId_GetTheme()
        {
            var error = "No CharityId: " + Guid.Empty;
            charityRepoMoq
                .Setup(cr => cr.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(Result<Charity>.Failure(error));

            var statusResult = await charityController.GetTheme(Guid.Empty);
            statusResult.Status.Should().Be(ApiResult.StatusConstants.Failed);
            statusResult.Data.Should().Be(error);
        }

        [Test]
        public async Task CanUpdateTheme()
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var connString = new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            var color = "#000000";
            var fontFamily = "Times";
            var penguinTheme = new Theme(color, color, color, color, fontFamily);
            var kylersPenguins = new Charity(
                Guid.NewGuid(),
                "Kyler's Penguins",
                "kyler has a lot of penguins",
                connString,
                new Domain[] { penguinDomain });

            var themeRequest = new ThemeRequest
            {
                Theme = penguinTheme,
                CharityId = kylersPenguins.CharityId
            };

            charityRepoMoq
                .Setup(cr => cr.GetById(kylersPenguins.CharityId))
                .ReturnsAsync(Result<Charity>.Success(kylersPenguins));

            themeRepoMoq
                .Setup(tr => tr.Update(penguinTheme, kylersPenguins.ConnectionString))
                .ReturnsAsync(Result<bool>.Success(true));

            var res = await charityController.UpdateTheme(themeRequest);
            res.Status.Should().Be(ApiResult.StatusConstants.Success);
        }
    }
}