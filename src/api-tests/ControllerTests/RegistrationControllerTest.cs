using Api.Extensions;
using Microsoft.Extensions.Logging;

namespace Tests.ControllerTests;

public class RegistrationControllerTest
{
    private PersonRepository GetPersonRepository()
    {
        var context = TestHelpers.CreateContext();
        return new PersonRepository(context, TestHelpers.AspenMapper);
    }
    private TeamRepository GetTeamRepository()
    {
        var context = TestHelpers.CreateContext();
        return new TeamRepository(context, TestHelpers.AspenMapper);
    }
    private EventRepository GetEventRepository()
    {
        var context = TestHelpers.CreateContext();
        return new EventRepository(context, TestHelpers.AspenMapper);
    }

    public static RegistrationController GetRegistrationController()
    {
        var context = TestHelpers.CreateContext();
        var registrationRepository = new RegistrationRepository(context, TestHelpers.AspenMapper);
        var personRepository = new PersonRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<RegistrationController>>();
        return new RegistrationController(registrationRepository, personRepository, TestHelpers.AspenMapper, loggerMock.Object);
    }

    [Test]
    public async Task CanCreateRegistration()
    {
        var dtoRegistration = await createRegistration();

        dtoRegistration.CreationDate.Should().NotBe(null);
    }

    private async Task<DtoRegistration> createRegistration()
    {
        var owner = await GetPersonRepository().AddAsync("ben", null);
        var eventEntity = new Event(0, "Title", "Marathon1", new DateTime(2021, 6, 21).SetKindUtc(), "Snow College", "marathon.jpg");
        var newEvent = await GetEventRepository().AddAsync(eventEntity);
        var team = new Team
        {
            OwnerID = owner.ID,
            EventID = newEvent.ID,
            Name = $"New Team {owner.ID}-{newEvent.ID}",
            Description = "Test Team",
            MainImage = "Snow.jpg"
        };

        team = await GetTeamRepository().AddAsync(team);
        var uncreatedDtoRegistration = new DtoRegistration
        {
            OwnerID = owner.ID,
            TeamID = team.ID,
            Nickname = "nickname"
        };

        var dtoRegistrationResponse = await GetRegistrationController().Add(uncreatedDtoRegistration);
        return dtoRegistrationResponse.Value;
    }


    [Test]
    public async Task CanGetRegistrationWithParticipants()
    {
        var dtoRegistration = await createRegistration();
        var personId = (await GetPersonRepository().AddAsync("Person1", "Bogus Bio")).ID;

        var returnedRegistration = (await GetRegistrationController().LinkPersonRegistration(dtoRegistration.ID, personId)).Value;

        returnedRegistration.PersonRegistrations.First().PersonID.Should().Be(personId);
    }

    [Test]
    public async Task CanGetRegistrationById()
    {
        var original = await createRegistration();
        var anotherCopy = (await GetRegistrationController().GetByID(original.ID)).Value;
        anotherCopy.Should().BeEquivalentTo(original);
    }

    [Test]
    public async Task RegistrationIsIncludedInPerson()
    {
        var registration = await createRegistration();
        var personController = PersonControllerTest.GetPersonController();
        var registrationController = GetRegistrationController();

        var teamMember = (await personController.Add(new DtoPerson { Name = "Team Member", Bio = "this person" })).Value;
        var teamMemberRegistration = (await registrationController.LinkPersonRegistration(registration.ID, teamMember.ID)).Value;

        var registrations = await personController.GetRegistrationsByID(teamMember.ID);
        registrations.First().PersonRegistrations.Any(pr => pr.PersonID == teamMember.ID).Should().BeTrue();
    }

    [Test]
    public async Task CanUpdateRegistration()
    {
        var original = await createRegistration();
        var modifiedDto = original with { Nickname = "New", IsPublic = !original.IsPublic };
        var returnedDto = (await GetRegistrationController().Edit(modifiedDto)).Value;
        returnedDto.Should().BeEquivalentTo(modifiedDto);

        var anotherCopy = (await GetRegistrationController().GetByID(original.ID)).Value;
        anotherCopy.Should().BeEquivalentTo(returnedDto);
    }

    [Test]
    public async Task CanDeleteRegistration()
    {
        var original = await createRegistration();
        await GetRegistrationController().Delete(original.ID);

        var badTeamRequests = await GetRegistrationController().GetByID(original.ID);

        var actual = badTeamRequests.Result as NotFoundObjectResult;
        actual.StatusCode.Should().Be(404);
    }
}
