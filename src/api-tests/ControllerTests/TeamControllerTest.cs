using Api.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;
using Tests.Steps;

namespace Tests.ControllerTests;

public class TeamControllerTest
{

    public static TeamController GetTeamController()
    {
        var context = TestHelpers.CreateContext();
        var personTeamAssociationRepository = new PersonTeamAssoicationRepository(context, TestHelpers.AspenMapper);
        var TeamRepository = new TeamRepository(context, TestHelpers.AspenMapper, personTeamAssociationRepository);
        var personRepository = new PersonRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<TeamController>>();
        return new TeamController(TeamRepository, TestHelpers.AspenMapper, loggerMock.Object, personTeamAssociationRepository, personRepository);
    }

    public async Task<DtoTeam> addTeamtoEvent(long eventId, string ownerName, string teamName, string teamDescription)
    {
        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = ownerName, Nickname = "bob" })).Value;
        var newTeam = new DtoTeam { Name = teamName, Description = teamDescription, OwnerID = newPerson.ID, EventID = eventId, MainImage = "image.jpg" };
        var dtoTeam = (await GetTeamController().Add(newTeam)).Value;
        return dtoTeam;
    }

    [Test]
    public async Task CanCreateTeam()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;
        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;
        var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };
        var dtoTeam = (await GetTeamController().Add(newTeam)).Value;
        dtoTeam.ID.Should().NotBe(0);
        dtoTeam.Description.Should().Be("George");
        dtoTeam.Name.Should().Be("New Team!");
        dtoTeam.DonationTarget.Should().Be(500);
    }

    [Test]
    public async Task CanGetDifferentTeam()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "Event" })).Value;
        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;
        var newTeam = new DtoTeam { Name = "TeamGeorge", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, MainImage = "image.jpg" };
        var dtoTeam = (await GetTeamController().Add(newTeam)).Value;

        var returnedTeam = (await GetTeamController().GetByID(dtoTeam.ID)).Value;
        returnedTeam.Description.Should().Be("George");
    }


    [Test]
    public async Task CanDeleteTeam()
    {
        var teamController = GetTeamController();
        teamController.ControllerContext = new ControllerContext();
        teamController.ControllerContext.HttpContext = new DefaultHttpContext();

        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "Event" })).Value;
        
        var dtoTeam = await addTeamtoEvent(newEvent.ID, "TeamJayse", "Jayse", "Jayse");

        var getPerson = (await PersonControllerTest.GetPersonController().GetByID(dtoTeam.OwnerID)).Value;

        var userClaims = new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, "TeamJayse"),
                new Claim(ClaimTypes.Email, getPerson.AuthID),
            };
        var user = new ClaimsPrincipal(new ClaimsIdentity(userClaims, "TestEditTeam"));
        teamController.ControllerContext.HttpContext.User = user;
        
        await teamController.Delete(dtoTeam);

        var archivedTeamRequest = await teamController.GetByID(dtoTeam.ID);

        var actual = archivedTeamRequest.Value;
        actual.IsArchived.Should().Be(true);
    }

    [Test]
    public async Task CanEditTeam()
    {
        var teamController = GetTeamController();
        teamController.ControllerContext = new ControllerContext();
        teamController.ControllerContext.HttpContext = new DefaultHttpContext();

        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "Event" })).Value;
        var dtoTeam = await addTeamtoEvent(newEvent.ID, "TeamJayse", "Jayse", "Jayse");

        var getPerson = (await PersonControllerTest.GetPersonController().GetByID(dtoTeam.OwnerID)).Value;

        var userClaims = new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, "TeamJayse"),
                new Claim(ClaimTypes.Email, getPerson.AuthID),
            };
        var user = new ClaimsPrincipal(new ClaimsIdentity(userClaims, "TestEditTeam"));
        teamController.ControllerContext.HttpContext.User = user;


        var editedTeam = dtoTeam with { Description = "Changed", DonationTarget = 1234 };

        await teamController.Edit(editedTeam);

        var returnedTeam = (await teamController.GetByID(editedTeam.ID)).Value;
        returnedTeam.Description.Should().Be(editedTeam.Description);
        returnedTeam.DonationTarget.Should().Be(1234);
    }


    [Test]
    public async Task GetAllTeamsPerEvent()
    {
        var api = new AspenApi();
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "Event" })).Value;
        await addTeamtoEvent(newEvent.ID, "Adam", "JayseTeam", "Jayse");
        await addTeamtoEvent(newEvent.ID, "Adam1", "JayseTeam1", "Jayse1");
        await addTeamtoEvent(newEvent.ID, "Adam2", "JayseTeam2", "Jayse2");

        var teams = await GetTeamController().GetByEventID(newEvent.ID);

        var count = teams.Value.Count();
        count.Should().Be(3);
    }

}
