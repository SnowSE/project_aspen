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
    public class LinkRecordControllerTests
    {

        private EventController eventController;
        private DtoEvent testEvent;
        private LinkController linkController;
        private DtoLink testLinkLoggedInUser;
        private DtoPerson personOne;
        private LinkRecordController linkRecordController;
        private DtoLinkRecord dtoLinkRecord;

        public static LinkController GetLinkController()
        {
            var context = TestHelpers.CreateContext();
            var linkRepository = new LinkRepository(context, TestHelpers.AspenMapper);
            var loggerMock = new Mock<ILogger<LinkController>>();
            return new LinkController(linkRepository, TestHelpers.AspenMapper, loggerMock.Object);
        }

        public static LinkRecordController GetLinkRecordController()
        {
            var context = TestHelpers.CreateContext();
            var linkRecordRepository = new LinkRecordRepository(context, TestHelpers.AspenMapper);
            var loggerMock = new Mock<ILogger<LinkRecordController>>();
            return new LinkRecordController(linkRecordRepository, TestHelpers.AspenMapper, loggerMock.Object);
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

            //Setup Link
            linkController = GetLinkController();
            testLinkLoggedInUser = (await linkController.Add(new DtoLink
            {
                EventID = testEvent.ID,
                PersonID = personOne.ID,
                Date = new DateTime(1775, 7, 2).SetKindUtc(),
                LinkURL = "http://google.com",
                LinkGUID = "77d475fd-7107-4e1a-9219-bde7e0e5d007"
            })).Value;

            //Setup LinkRecord
            linkRecordController = GetLinkRecordController();
            dtoLinkRecord = (await linkRecordController.AddAsync(new DtoLinkRecord
            {
                LinkID = testLinkLoggedInUser.ID,
                PersonID = personOne.ID,
                Date = new DateTime(1775, 7, 2).SetKindUtc(),
            })).Value;
        }

        [Test]
        public async Task CanAddLinkRecord()
        {
            dtoLinkRecord.ID.Should().NotBe(0);
            dtoLinkRecord.LinkID.Should().Be(testLinkLoggedInUser.ID);
            dtoLinkRecord.PersonID.Should().Be(personOne.ID);
            dtoLinkRecord.Date.Should().Be(new DateTime(1775, 7, 2).SetKindUtc());

        }
    }
}