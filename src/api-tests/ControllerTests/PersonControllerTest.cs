using Microsoft.Extensions.Logging;

namespace Tests.ControllerTests;

public class PersonControllerTest
{
    public static PersonController GetPersonController()
    {
        var context = TestHelpers.CreateContext();
        var personRepository = new PersonRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<PersonController>>();
        return new PersonController(personRepository, TestHelpers.AspenMapper, loggerMock.Object);
    }

    [Test]
    public async Task CanCreatePerson()
    {
        var newPerson = new DtoPerson { Name = "George" };
        var dtoPerson = (await GetPersonController().Add(newPerson)).Value;
        dtoPerson.ID.Should().NotBe(0);
        dtoPerson.Name.Should().Be("George");
    }

    [Test]
    public async Task CanGetCreatedPerson()
    {
        var newPerson = new DtoPerson { Name = "George", Bio = "bio" };
        var createdPerson = (await GetPersonController().Add(newPerson)).Value;
        var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
        returnedPerson.Name.Should().Be("George");
    }

    [Test]
    public async Task CanGetDifferentPerson()
    {
        var newPerson = new DtoPerson { Name = "Ben", Bio = "bio" };
        var createdPerson = (await GetPersonController().Add(newPerson)).Value;
        var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
        returnedPerson.Name.Should().Be("Ben");
    }

    [Test]
    public async Task CanDeletePerson()
    {
        var newPerson = new DtoPerson { Name = "Ben", Bio = "This person" };
        var createdPerson = (await GetPersonController().Add(newPerson)).Value;
        await GetPersonController().Delete(createdPerson.ID);
        var badPersonRequests = await GetPersonController().GetByID(createdPerson.ID);

        var actual = badPersonRequests.Result as NotFoundObjectResult;
        actual.StatusCode.Should().Be(404);
    }

    [Test]
    public async Task BadDeleteRequestsReturnBadRequest()
    {
        var badDeleteResult = await GetPersonController().Delete(-1);

        var result = badDeleteResult as NotFoundObjectResult;
        result.StatusCode.Should().Be(404);
        result.Value.Should().Be("Person id does not exist");
    }

    [Test]
    public async Task CanEditPerson()
    {
        var newPerson = new DtoPerson { Name = "Ben", Bio = "This person" };
        var createdPerson = (await GetPersonController().Add(newPerson)).Value;

        var editedPerson = createdPerson with { Name = "Not Ben" };
        await GetPersonController().Edit(TestHelpers.AspenMapper.Map<DtoPerson>(editedPerson));

        var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
        returnedPerson.Name.Should().Be(editedPerson.Name);
    }

    [Test]
    public async Task BadEditRequestReturnsNotFoundResult()
    {
        var badEditResult = await GetPersonController().Edit(new DtoPerson { ID = -1 });

        var result = badEditResult.Result as NotFoundObjectResult;
        result.StatusCode.Should().Be(404);
    }
}
