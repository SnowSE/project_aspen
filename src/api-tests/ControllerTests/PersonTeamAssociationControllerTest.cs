using Api.DataAccess;
using Microsoft.Extensions.Logging;

namespace Tests.ControllerTests;

public class PersonTeamAssociationControllerControllerTest
{
    public static PersonTeamAssociationController GetPersonTeamAssociationController()
    {
        var context = TestHelpers.CreateContext();
        var personTeamAssociationRepository = new PersonTeamAssoicationRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<PersonTeamAssociationController>>();
        return new PersonTeamAssociationController(personTeamAssociationRepository, TestHelpers.AspenMapper, loggerMock.Object);
    }

    [Test]
    public async Task CanCreatePersonTeamRecord()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;

        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;

        var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };

        var dtoTeam = (await TeamControllerTest.GetTeamController().Add(newTeam)).Value;

        var newPersonTeamAssociation = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };
        var result = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociation)).Value;
        result.ID.Should().NotBe(0);
        result.PersonId.Should().Be(newPerson.ID);
        result.TeamId.Should().Be(dtoTeam.ID);
        result.EventId.Should().Be(newEvent.ID);
    }

    [Test]

    public async Task CanGetAllPeopleInTeam()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;

        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;

        var newPersonTwo = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "John", Nickname = "bobby" })).Value;

        var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };

        var dtoTeam = (await TeamControllerTest.GetTeamController().Add(newTeam)).Value;

        var newPersonTeamAssociation = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };

        var result = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociation)).Value;
        Assert.NotNull(result);

        var newPersonTeamAssociationTwo = new DtoPersonTeamAssociation { PersonId = newPersonTwo.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };

        var resultTwo = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociationTwo)).Value;
        Assert.NotNull(resultTwo);

        var teamMembers = (await GetPersonTeamAssociationController().GetTeamMembersAsync(dtoTeam.ID)).Value;

        teamMembers.Count.Should().Be(2);
        teamMembers[0].ID.Should().Be(newPerson.ID);
        teamMembers[1].ID.Should().Be(newPersonTwo.ID);

    }

    [Test]
    public async Task CanGetTeamFromPersonIdAndEventID()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;

        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;

        var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };

        var dtoTeam = (await TeamControllerTest.GetTeamController().Add(newTeam)).Value;

        var newPersonTeamAssociation = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };
        var result = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociation)).Value;
        Assert.NotNull(result);

        var team = (await GetPersonTeamAssociationController().GetTeamAsync(newPerson.ID,newEvent.ID)).Value;
        team.Equals(dtoTeam);
    }

    [Test]
    public async Task CanNotAddPersonToTwoTeams()
    {
        var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;

        var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;

        var newPersonTwo = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "John", Nickname = "bobby" })).Value;

        var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };

        var newTeam2 = new DtoTeam { Name = "New Team2", Description = "George2", OwnerID = newPersonTwo.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg" };

        var dtoTeam = (await TeamControllerTest.GetTeamController().Add(newTeam)).Value;
        Assert.NotNull(dtoTeam);

        var dtoTeam2 = (await TeamControllerTest.GetTeamController().Add(newTeam2)).Value;
        Assert.NotNull(dtoTeam2);

        var newPersonTeamAssociation = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };

        var result = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociation)).Value;
        Assert.NotNull(result);

        var newPersonTeamAssociation2 = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam2.ID, EventId = newEvent.ID };

        try
        {
            var result2 = GetPersonTeamAssociationController().Add(newPersonTeamAssociation2).Result;
        }
        catch (Exception ex)
        {
            Assert.AreEqual("This person is already on the team for this event.", ex.InnerException.Message);
        }
    }
}
