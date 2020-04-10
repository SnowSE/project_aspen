using System;
using System.Threading.Tasks;
using Aspen.Api.Controllers;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Aspen.Tests.ControllerTests
{
    public class CharityAdminControllerTest
    {
        private Mock<ICharityRepository> charityRepoMoq;
        private Mock<IThemeRepository> themeRepoMoq;
        private CharityAdminController charityAdminController;

        [SetUp]
        public void Setup()
        {
            charityRepoMoq = new Mock<ICharityRepository>();
            themeRepoMoq = new Mock<IThemeRepository>();
            charityAdminController = new CharityAdminController(charityRepoMoq.Object, themeRepoMoq.Object);
        }

        [Test]
        public async Task Delete_HandlesBadInput()
        {
            var connString = new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            var badcharity = new Charity(Guid.NewGuid(), "nonexistantcharity", "description", connString, new Domain[] {});
            charityRepoMoq
                .Setup(cr => cr.Delete(badcharity))
                .ReturnsAsync(InternalResult<bool>.Failure("Charity does not exist"));

            var result = await charityAdminController.Delete(badcharity);
            result.Status.Should().Be(ApiResult.StatusConstants.Failed);
            result.Data.Should().Be("Charity does not exist");
        }

        [Test]
        public async Task GetByIdHandlesBadId()
        {
            var failureMessage = "Charity does not exist";
            charityRepoMoq
                .Setup(cr => cr.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(InternalResult<Charity>.Failure(failureMessage));
            
            var statusReturn = await charityAdminController.Get(Guid.Empty);
            statusReturn.Status.Should().Be(ApiResult.StatusConstants.Failed);
            statusReturn.Data.Should().Be(failureMessage);
        }
    }
}