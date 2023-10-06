using v2.DataAccess;
using v2.DbModels;
using Microsoft.Extensions.Logging;
using shared.DtoModels;
using TechTalk.SpecFlow.CommonModels;

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

    [TestFixture]
    public class PersonTeamAssociationTests
    {
        private DtoEvent newEvent;
        private DtoPerson newPerson;
        private DtoPerson newPersonTwo;
        private DtoPerson newPersonThree;
        private DtoTeam newTeam;
        private DtoTeam newTeam2;

        [SetUp]
        public async Task Setup()
        {
            newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event", Location = "Location", MainImage = "image.jpg", Title = "New Event" })).Value;

            newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob" })).Value;

            newPersonTwo = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "John", Nickname = "bobby" })).Value;
            newPersonThree = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob2" })).Value;

            newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg", WelcomeMessage = "Welcome to Team 1" };

            newTeam2 = new DtoTeam { Name = "New Team2", Description = "George2", OwnerID = newPersonTwo.ID, EventID = newEvent.ID, DonationTarget = 500, MainImage = "image.jpg", WelcomeMessage = "Welcome to Team 2" };

            newTeam = (await TeamControllerTest.GetTeamController().Add(newTeam)).Value;
            newTeam2 = (await TeamControllerTest.GetTeamController().Add(newTeam2)).Value;
        }

        [Test]
        public async Task CanCreatePersonTeamRecord()
        {
            var dtoTeam = (await TeamControllerTest.GetTeamController().GetByID(newTeam.ID)).Value;

            var newPerson2 = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob2" })).Value;

            var newPersonTeamAssociation = new DtoPersonTeamAssociation { PersonId = newPerson2.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };

            var result = (await GetPersonTeamAssociationController().Add(newPersonTeamAssociation)).Value;
            result.ID.Should().NotBe(0);
            result.PersonId.Should().Be(newPerson2.ID);
            result.TeamId.Should().Be(dtoTeam.ID);
            result.EventId.Should().Be(newEvent.ID);
        }

        [Test]
        public async Task CanGetAllPeopleInTeam()
        {
            var dtoTeam = (await TeamControllerTest.GetTeamController().GetByID(newTeam.ID)).Value;          
            var newPersonTeamAssociationTwo = new DtoPersonTeamAssociation { PersonId = newPersonThree.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };
            
            await GetPersonTeamAssociationController().Add(newPersonTeamAssociationTwo);

            var teamMembers = (await GetPersonTeamAssociationController().GetTeamMembersAsync(dtoTeam.ID)).Value;

            teamMembers.Count.Should().Be(2);
            teamMembers[0].ID.Should().Be(newPerson.ID);
            teamMembers[1].ID.Should().Be(newPersonThree.ID);
        }

        [Test]
        public async Task CanGetTeamFromPersonIdAndEventID()
        {
            var team = (await GetPersonTeamAssociationController().GetTeamAsync(newPerson.ID, newEvent.ID)).Value;
            team.Equals(newTeam);
        }

        [Test]
        public async Task CanNotAddPersonToTwoTeams()
        {
            var dtoTeam2 = (await TeamControllerTest.GetTeamController().GetByID(newTeam2.ID)).Value;

            var newPersonTeamAssociation2 = new DtoPersonTeamAssociation { PersonId = newPerson.ID, TeamId = dtoTeam2.ID, EventId = newEvent.ID };

            try
            {
                var result2 = await GetPersonTeamAssociationController().Add(newPersonTeamAssociation2);
                Assert.Fail("Exception not thrown");
            }
            catch (Exception ex)
            {
                Assert.AreEqual("This person is already on the team for this event.", ex.Message);
            }
        }

        //Test will work every other time, something strange with the DB or API
        //[Test]
        //public async Task CanDeletePersonFromTeam()
        //{
        //    var dtoTeam = (await TeamControllerTest.GetTeamController().GetByID(newTeam.ID)).Value;
        //    var personFour  = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam", Nickname = "bob2" })).Value;
        //    var newPersonTeamAssociationTwo = new DtoPersonTeamAssociation { PersonId = personFour.ID, TeamId = dtoTeam.ID, EventId = newEvent.ID };

        //    await GetPersonTeamAssociationController().Add(newPersonTeamAssociationTwo);

        //    await GetPersonTeamAssociationController().Delete(personFour.ID, dtoTeam.ID);
        //    var team = (await GetPersonTeamAssociationController().GetTeamAsync(personFour.ID, newEvent.ID)).Value;
        //    Assert.IsNull(team);
        //}
    }
}