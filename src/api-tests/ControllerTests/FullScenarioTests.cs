using Api.DtoModels;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tests.Controller;

namespace Tests.ControllerTests
{
    public class FullScenarioTests
    {
        [Test]
        public async Task FullScenario()
        {
            var newEvent = await createEvent();
            var person = await createPerson();
            var team = await createTeam(person, newEvent.ID);

            var allTeamsInEvent = await getTeams(newEvent.ID);
            allTeamsInEvent.Count().Should().Be(1);

            var registration = await createRegistration(person, team);
            registration.Nickname.Should().Be("Reg1");
        }

        private async Task<DtoEvent> createEvent() =>
            (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "Full Scenario", Date = DateTime.Now, Location = "NUnit" })).Value;

        private async Task<IEnumerable<DtoEvent>> getEvents() =>
            await EventControllerTest.GetEventController().GetAll();

        private async Task<DtoPerson> createPerson() =>
            (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;

        private async Task<DtoTeam> createTeam(DtoPerson person, long eventId) =>
            (await TeamControllerTest.GetTeamController().Add(new DtoTeam {Name = "New Team Name", Description = "Team1", OwnerID = person.ID, EventID = eventId })).Value;

        private async Task<IEnumerable<DtoTeam>> getTeams(long eventId) =>
            await TeamControllerTest.GetTeamController().GetByEventID(eventId);

        private async Task<DtoRegistration> createRegistration(DtoPerson owner, DtoTeam team) =>
            (await RegistrationControllerTest.GetRegistrationController().Add(new DtoRegistration { Nickname = "Reg1", OwnerID = owner.ID, TeamID = team.ID })).Value;
    }
}
