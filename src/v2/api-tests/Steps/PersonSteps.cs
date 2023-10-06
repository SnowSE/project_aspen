using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Tests.Steps
{
    [Binding]
    public class PersonSteps
    {
        private readonly AspenApi api;
        private readonly ScenarioContext scenarioContext;
        private readonly ISpecFlowOutputHelper outputHelper;

        public PersonSteps(AspenApi api, ScenarioContext scenarioContext, ISpecFlowOutputHelper outputHelper)
        {
            this.api = api;
            this.scenarioContext = scenarioContext;
            this.outputHelper = outputHelper;
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
            outputHelper.WriteLine("*** Connection String: " + Environment.GetEnvironmentVariable("ASPEN_TEST_CONNECTION_STRING"));
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
