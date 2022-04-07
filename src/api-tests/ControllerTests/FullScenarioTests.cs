using shared.DtoModels;
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

        var registration = await createRegistration(person, team);
        registration.Nickname.Should().Be("Reg1");
    }

    [Test]
    public async Task GettingTeamsForANonExistentEventReturns404NotFound()
    {
        var api = new AspenApi();
        var response = api.GetTeamsByEvent(int.MaxValue);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
    }

    private async Task<DtoEvent> createEvent() =>
        (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "Full Scenario", Date = DateTime.Now, Location = "NUnit" })).Value;

    private async Task<DtoPerson> createPerson() =>
        (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;

    private async Task<DtoTeam> createTeam(DtoPerson person, long eventId) =>
        (await TeamControllerTest.GetTeamController().Add(new DtoTeam { Name = "New Team Name", Description = "Team1", OwnerID = person.ID, EventID = eventId })).Value;

    private async Task<IEnumerable<DtoTeam>> getTeams(long eventId) =>
        (await TeamControllerTest.GetTeamController().GetByEventID(eventId)).Value;

    private async Task<DtoRegistration> createRegistration(DtoPerson owner, DtoTeam team) =>
        (await RegistrationControllerTest.GetRegistrationController().Add(new DtoRegistration { Nickname = "Reg1", OwnerID = owner.ID, TeamID = team.ID })).Value;
}
