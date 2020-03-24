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
        private CharityController charityController;

        [SetUp]
        public void Setup()
        {
            charityRepoMoq = new Mock<ICharityRepository>();
            charityController = new CharityController(charityRepoMoq.Object);

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
    }
}