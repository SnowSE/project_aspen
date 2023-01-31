using Api.Extensions;
using Microsoft.Extensions.Logging;
using Tests;
using Tests.Steps;

namespace Api.Tests.Controllers
{
    [TestFixture]
    public class LinkControllerTests
    {
        private LinkController linkController;
        private DtoLink testLink;

        public static LinkController GetLinkController()
        {
            var context = TestHelpers.CreateContext();
            var linkRepository = new LinkRepository(context, TestHelpers.AspenMapper);
            var loggerMock = new Mock<ILogger<LinkController>>();
            return new LinkController(linkRepository, TestHelpers.AspenMapper, loggerMock.Object);
        }
        
        [SetUp]
        public void SetUp()
        {
            linkController = GetLinkController();
            testLink = (await linkController.Add(new DtoLink
            {
                Identifier = "link1",
                Url = "https://www.google.com",
                Description = "Google",
                ImageUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            })).Value;
        })).Value;
        }

        [Test]
        public async Task Get_ReturnsLink_WhenLinkIdentifierExists()
        {
            // Arrange
            var linkIdentifier = "link1";
            var link = new Link { Identifier = linkIdentifier };
            var dtoLink = new DtoLink { Identifier = linkIdentifier };
            _linkRepositoryMock.Setup(x => x.GetLinkByIdentiferAsync(linkIdentifier)).ReturnsAsync(link);
            _mapperMock.Setup(x => x.Map<DtoLink>(link)).Returns(dtoLink);

            // Act
            var result = await _controller.Get(linkIdentifier);

            // Assert
            result.Should().BeOfType<DtoLink>();
            result.Identifier.Should().Be(linkIdentifier);
            _linkRepositoryMock.Verify(x => x.GetLinkByIdentiferAsync(linkIdentifier), Times.Once);
            _mapperMock.Verify(x => x.Map<DtoLink>(link), Times.Once);
        }

    }
}