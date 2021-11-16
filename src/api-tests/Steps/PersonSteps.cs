using Api.DtoModels;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;

namespace Tests.Steps
{
    [Binding]
    public class PersonSteps
    {
        private readonly AspenApi api;
        private readonly ScenarioContext scenarioContext;

        public PersonSteps(AspenApi api, ScenarioContext scenarioContext)
        {
            this.api = api;
            this.scenarioContext = scenarioContext;
        }

        [Given(@"I want to create a person with the following information")]
        public void GivenIWantToCreateAPersonWithTheFollowingInformation(Table table)
        {
            var row = table.Rows[0];
            var dtoPerson = new DtoPerson
            {
                Name = row["Name"],
                Bio = row["Bio"]
            };
            scenarioContext.Set(dtoPerson, "personToCreate");
        }

        [When(@"I create that person")]
        public async Task WhenICreateThatPersonAsync()
        {
            var dtoPerson = scenarioContext.Get<DtoPerson>("personToCreate");
            var createdPerson = await api.CreatePersonAsync(dtoPerson);
            scenarioContext.Set(createdPerson, "createdPerson");
        }

        [Then(@"I get back a positive id")]
        public void ThenIGetBackAPositiveId()
        {
            var createdPerson = scenarioContext.Get<DtoPerson>("createdPerson");
            createdPerson.ID.Should().BePositive();
        }

    }
}
