using Tests.Steps;

namespace Tests.ControllerTests;

public class FullScenarioTests
{
    private DtoEvent newEvent;
    private DtoPerson person;
    private DtoTeam team;

    [SetUp]
    public async Task SetUp()
    {
        newEvent = await createEvent();
        person = await createPerson();
        team = await createTeam(person, newEvent.ID);
    }

    [Test]
    public async Task FullScenario()
    {
        var allTeamsInEvent = await getTeams(newEvent.ID);
        allTeamsInEvent.Count().Should().Be(1);
    }

    //TODO: Fix this test
    //[Test]
    //public async Task GettingTeamsForANonExistentEventReturns404NotFound()
    //{
    //    var api = new AspenApi();
    //    var response = api.GetTeamsByEvent(int.MaxValue);
    //    response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    //}

    private async Task<DtoEvent> createEvent() =>
        (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "Full Scenario", Date = DateTime.Now.ToUniversalTime(), Location = "NUnit", Title = "Full", MainImage = "image.jpg" })).Value;

    private async Task<DtoPerson> createPerson() =>
        (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Bio = "this person", Nickname = "bob" })).Value;

    private async Task<DtoTeam> createTeam(DtoPerson person, long eventId) =>
        (await TeamControllerTest.GetTeamController().Add(new DtoTeam { Name = "New Team Name", Description = "Team1", OwnerID = person.ID, EventID = eventId, MainImage = "image.jpg", WelcomeMessage = "Welcome to Team 1" })).Value;

    private async Task<IEnumerable<DtoTeam>> getTeams(long eventId) =>
        (await TeamControllerTest.GetTeamController().GetByEventID(eventId)).Value;

}
