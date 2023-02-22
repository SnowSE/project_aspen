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






}
