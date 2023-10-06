using v2.Controllers;
using v2.Extensions;
using Microsoft.Extensions.Logging;
using shared.DtoModels;
using Tests;
using Tests.ControllerTests;
using Tests.Steps;

namespace v2.Tests.Controllers
{
    [TestFixture]
    public class LinkControllerTests
    {
        private EventController eventController;
        private DtoEvent testEvent;
        private LinkController linkController;
        private DtoLink testLinkLoggedInUser;
        private DtoLink testGetLink;
        private DtoPerson personOne;

        public static LinkController GetLinkController()
        {
            var context = TestHelpers.CreateContext();
            var linkRepository = new LinkRepository(context, TestHelpers.AspenMapper);
            var loggerMock = new Mock<ILogger<LinkController>>();
            return new LinkController(linkRepository, TestHelpers.AspenMapper, loggerMock.Object);
        }
        
        [SetUp]
        public async Task SetUp()
        {
            ///Setup Event
            eventController = EventControllerTest.GetEventController();
            testEvent = (await eventController.Add(new DtoEvent
            {
                Date = new DateTime(1775, 7, 2).SetKindUtc(),
                Description = "Independence",
                Location = "Philly",
                Title = "Sign Here",
                MainImage = "july4.jpg"
            })).Value;
            
            //Setup Person
            var personController = PersonControllerTest.GetPersonController();
            personOne = (await personController.Add(new DtoPerson { Name = "Team 1 Owner", Nickname = "bob" })).Value;
            
            linkController = GetLinkController();
            testLinkLoggedInUser = (await linkController.Add(new DtoLink
            {
                EventID = testEvent.ID,
                PersonID = personOne.ID,
                Date = new DateTime(1775, 7, 2).SetKindUtc(),
                LinkURL = "http://google.com",
                LinkGUID = "77d475fd-7107-4e1a-9219-bde7e0e5d007"
            })).Value;
        }

        [Test]
        public async Task CanCreateLinkLoggedInUser()
        {
            testLinkLoggedInUser.ID.Should().NotBe(0);
            testLinkLoggedInUser.EventID.Should().Be(1);
            testLinkLoggedInUser.LinkURL.Should().Be("http://google.com");
            testLinkLoggedInUser.LinkGUID.Should().Be("77d475fd-7107-4e1a-9219-bde7e0e5d007");
        }

        [Test]
        public async Task CanGetLinkFromIdentifier()
        {

            testGetLink = (await linkController.Get("77d475fd-7107-4e1a-9219-bde7e0e5d007"));
            testGetLink.ID.Should().Be(1);
            testGetLink.EventID.Should().Be(1);
            testGetLink.LinkURL.Should().Be("http://google.com");
            testGetLink.LinkGUID.Should().Be("77d475fd-7107-4e1a-9219-bde7e0e5d007");
        }

    }
}