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
            var team = createTeam(person);

            //var registration = createRegistration();

            //var newPerson = createPerson();
            //var newRegistration = createRegistration();

        }

        private async Task<DtoEvent> createEvent() =>
            (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "Full Scenario", Date = DateTime.Now, Location = "NUnit" })).Value;

        private async Task<IEnumerable<DtoEvent>> getEvents() =>
            await EventControllerTest.GetEventController().GetAllEvents();

        private async Task<DtoPerson> createPerson() =>
            (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;

        private async Task<DtoTeam> createTeam(DtoPerson person)
        {
            //var teamController = TeamControllerTests.
            throw new Exception();
        }

        private object getTeams()
        {
            throw new NotImplementedException();
        }

        private object createRegistration()
        {
            throw new NotImplementedException();
        }
    }
}
