using Microsoft.Extensions.Logging;

namespace Tests.ControllerTests;

public class EventControllerTest
{
    public static EventController GetEventController()
    {
        var context = TestHelpers.CreateContext();
        var eventRepository = new EventRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<EventController>>();
        return new EventController(eventRepository, TestHelpers.AspenMapper, loggerMock.Object);
    }

    [Test]
    public async Task CanCreateEvent()
    {
        var newEvent = new DtoEvent
        {
            Description = "Marathon1",
            Title = "Marathon at Snow",
            Location = "Snow",
            MainImage = "Snow.jpg"
        };

        var eventController = GetEventController();
        var dtoEvent = (await eventController.Add(newEvent)).Value;

        dtoEvent.ID.Should().NotBe(0);
        dtoEvent.Description.Should().Be("Marathon1");
    }

    [Test]
    public async Task CanGetCreatedEvent() //eventually
    {
        var newEvent = new DtoEvent()
        {
            Description = "Marathon2",
            Title = "Marathon at Snow",
            Location = "Snow",
            MainImage = "Snow.jpg"
        };

        var eventController = GetEventController();
        var createdEvent = (await eventController.Add(newEvent)).Value;
        var returnedEvent = (await eventController.GetByID(createdEvent.ID)).Value;

        returnedEvent.ID.Should().NotBe(0);
        returnedEvent.Description.Should().Be("Marathon2");
    }

    [Test]
    public async Task CanGetCreatedEventTitle() //eventually
    {
        var newEvent = new DtoEvent()
        {
            Title = "Marathon",
            Description = "Cool Marathon2",
            Location = "Snow",
            DonationTarget = 1.23M,
            MainImage = "Snow.jpg"
        };

        var eventController = GetEventController();
        var createdEvent = (await eventController.Add(newEvent)).Value;
        var returnedEvent = (await eventController.GetByID(createdEvent.ID)).Value;

        returnedEvent.ID.Should().NotBe(0);
        returnedEvent.Title.Should().Be("Marathon");
        returnedEvent.DonationTarget.Should().Be(1.23M);
    }

    [Test]
    public async Task CanEditCreatedEvent() //eventually
    {
        var newEvent = new DtoEvent()
        {
            Description = "Marathon2",
            Location = "Snow",
            MainImage = "image.jpg",
            Title = "Marathon2"
        };

        var createdEvent = (await GetEventController().Add(newEvent)).Value;

        var changedEvent = createdEvent with { Description = "This is changed", DonationTarget = 12345.67M };
        await GetEventController().Edit(changedEvent);

        var returnedEvent = (await GetEventController().GetByID(createdEvent.ID)).Value;
        returnedEvent.Description.Should().Be("This is changed");
        returnedEvent.DonationTarget.Should().Be(12345.67M);
    }

    [Test]
    public async Task CanEditCreatedEventWithTitle() //eventually
    {
        var newEvent = new DtoEvent()
        {
            Title = "Best title",
            Description = "Marathon2",
            Location = "Snow",
            MainImage = "image.jpg"
        };

        var createdEvent = (await GetEventController().Add(newEvent)).Value;

        var changedEvent = createdEvent with { Title = "This is changed" };
        await GetEventController().Edit(changedEvent);

        var returnedEvent = (await GetEventController().GetByID(createdEvent.ID)).Value;
        returnedEvent.Title.Should().Be("This is changed");
    }

    [Test]
    public async Task CanDeleteEvent()
    {
        var newEvent = new DtoEvent()
        {
            Title = "Marathon2",
            Description = "Marathon2",
            Location = "Snow",
            MainImage = "snow.jpg"
        };
        var createdEvent = (await GetEventController().Add(newEvent)).Value;

        await GetEventController().Delete(createdEvent.ID);

        var badEventResult = await GetEventController().GetByID(createdEvent.ID);
        var result = badEventResult.Result as NotFoundObjectResult;
        result.StatusCode.Should().Be(404);
        result.Value.Should().Be("Event id does not exist");
    }

    [Test]
    public async Task BadDeleteRequestReturnsBadRequest()
    {
        var badDeleteResult = await GetEventController().Delete(-1);
        var result = badDeleteResult as NotFoundObjectResult;
        result.StatusCode.Should().Be(404);
        result.Value.Should().Be("Event id does not exist");
    }

    [Test]
    public async Task EnsurePostedIdIsIgnoredOnPush()
    {
        //Arrange, make a good event
        var newEvent = new DtoEvent()
        {
            Title = "Marathon",
            Description = "Marathon2",
            Location = "Snow",
            MainImage = "snow.jpg"
        };
        var goodEvent = (await GetEventController().Add(newEvent)).Value;

        //act - try to re-create that same event
        var failureResponse = (await GetEventController().Add(goodEvent)).Result as BadRequestObjectResult;

        //assert - can't do it.
        failureResponse.StatusCode.Should().Be(400);
    }
}
