using Api.Extensions;
using Microsoft.Extensions.Logging;
using RestSharp;
using Tests.Steps;

namespace Tests.ControllerTests;

public class DonationControllerTest
{
    private EventController eventController;
    private DtoEvent testEvent;
    private DtoTeam team1;
    private DtoTeam team2;
    private DtoPerson team1Owner;
    private DtoPerson team2Owner;
    private DtoDonation unassignedDonation;
    private DonationController donationController;
    private DtoDonation dtoDonation;
    private IEnumerable<DtoDonation> team1Donations;
    private IEnumerable<DtoDonation> team2Donations;

    public static DonationController GetDonationController()
    {
        var context = TestHelpers.CreateContext();
        var eventRepository = new DonationRepository(context, TestHelpers.AspenMapper);
        var loggerMock = new Mock<ILogger<DonationController>>();
        return new DonationController(eventRepository, TestHelpers.AspenMapper, loggerMock.Object);
    }

    [SetUp]
    public async Task SetUp()
    {
        eventController = EventControllerTest.GetEventController();
        testEvent = (await eventController.Add(new DtoEvent
        {
            Date = new DateTime(1775, 7, 2).SetKindUtc(),
            Description = "Independence",
            Location = "Philly",
            Title = "Sign Here",
            MainImage = "july4.jpg"
        })).Value;

        unassignedDonation = new DtoDonation
        {
            EventID = testEvent.ID,
            Amount = 1_000M,
            Date = new DateTime(1775, 7, 4).SetKindUtc()
        };

        donationController = GetDonationController();
        dtoDonation = (await donationController.Add(unassignedDonation)).Value;

        var personController = PersonControllerTest.GetPersonController();
        team1Owner = (await personController.Add(new DtoPerson { Name = "Team 1 Owner" })).Value;
        team2Owner = (await personController.Add(new DtoPerson { Name = "Team 2 Owner" })).Value;

        var teamController = TeamControllerTest.GetTeamController();
        team1 = (await teamController.Add(new DtoTeam { Description = "Team1", EventID = testEvent.ID, Name = "Team1", OwnerID = team1Owner.ID , MainImage = testEvent.MainImage })).Value;
        team2 = (await teamController.Add(new DtoTeam { Description = "Team2", EventID = testEvent.ID, Name = "Team2", OwnerID = team2Owner.ID, MainImage = testEvent.MainImage })).Value;


        team1Donations = new[]
        {
            createDonation(testEvent.ID, team1.ID, 100),
            createDonation(testEvent.ID, team1.ID, 200)
        };

        team2Donations = new[]
        {
            createDonation(testEvent.ID, team2.ID, 300),
            createDonation(testEvent.ID, team2.ID, 400)
        };

        foreach (var donation in team1Donations.Union(team2Donations))
        {
            await donationController.Add(donation);
        }
    }

    private DtoDonation createDonation(long eventId, long? teamId, decimal amount)
    {
        return new DtoDonation
        {
            Amount = amount,
            Date = new DateTime(1775, 7, 4).SetKindUtc(),
            EventID = eventId,
            TeamID = teamId,
            TeamName = team1.ID == teamId ? team1.Name : team2.Name,
            IsPending = true
        };
    }

    [Test]
    public async Task DeletingATeamWithAssociatedDonationsReturnsABadRequest()
    {
        var client = new AspenApi().Client;
        var request = new RestRequest($"api/teams/{team2.ID}");
        var response = client.Delete(request);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
    }

    [Test]
    public async Task CanCreateDonation()
    {
        dtoDonation.ID.Should().NotBe(0);
        dtoDonation.EventID.Should().Be(testEvent.ID);
    }

    [Test]
    public async Task CanSumDonationsForATeam()
    {
        var actualTeam1Sum = (await donationController.GetTeamDonationSum(testEvent.ID, team1.ID)).Value;
        var expectedTeam1Sum = team1Donations.Sum(d => d.Amount);
        actualTeam1Sum.Should().Be(expectedTeam1Sum);
    }

    [Test]
    public async Task CanSumDonationsForTeam2()
    {
        var actualTeam2Sum = (await donationController.GetTeamDonationSum(testEvent.ID, team2.ID)).Value;
        var expectedTeam2Sum = team2Donations.Sum(d => d.Amount);
        actualTeam2Sum.Should().Be(expectedTeam2Sum);
    }

    [Test]
    public async Task CanSumDonationsForAnEntireEvent()
    {
        var actualDonationsSum = (await donationController.GetEventDonationSum(testEvent.ID)).Value;
        var expectedDonationSum = team1Donations.Union(team2Donations).Sum(d => d.Amount) + dtoDonation.Amount;
        actualDonationsSum.Should().Be(expectedDonationSum);
    }

    [Test]
    public async Task GetActualDonationsForEvent()
    {
        var adminController = AdminControllerTest.GetAdminController();
        var actualDonationsList = await adminController.GetEventDonations(testEvent.ID);
        var expectedDonationsList = new List<DtoDonation>();
        expectedDonationsList.Add(dtoDonation);
        expectedDonationsList.AddRange(team1Donations);
        expectedDonationsList.AddRange(team2Donations);

        actualDonationsList.Should().BeEquivalentTo(expectedDonationsList, options => options.Excluding(d => d.ID));
    }

    [Test]
    public async Task GetActualDonationsForTeam()
    {
        var adminController = AdminControllerTest.GetAdminController();
        var actualDonationsList = await adminController.GetTeamDonations(testEvent.ID, team1.ID);
        var expectedDonationsList = team1Donations;

        actualDonationsList.Should().BeEquivalentTo(expectedDonationsList, options => options.Excluding(d => d.ID));
    }

    //[Test]
    //public async Task CanGetCreatedDonation() //eventually
    //{
    //    var newDonation = new DtoDonation()
    //    {
    //        Description = "Marathon2",
    //        Location = "Snow"
    //    };

    //    var eventController = GetDonationController();
    //    var createdDonation = (await eventController.Add(newDonation)).Value;
    //    var returnedDonation = (await eventController.GetByID(createdDonation.ID)).Value;

    //    returnedDonation.ID.Should().NotBe(0);
    //    returnedDonation.Description.Should().Be("Marathon2");
    //}

    //[Test]
    //public async Task CanGetCreatedDonationTitle() //eventually
    //{
    //    var newDonation = new DtoDonation()
    //    {
    //        Title = "Marathon",
    //        Description = "Cool Marathon2",
    //        Location = "Snow"
    //    };

    //    var eventController = GetDonationController();
    //    var createdDonation = (await eventController.Add(newDonation)).Value;
    //    var returnedDonation = (await eventController.GetByID(createdDonation.ID)).Value;

    //    returnedDonation.ID.Should().NotBe(0);
    //    returnedDonation.Title.Should().Be("Marathon");
    //}

    //[Test]
    //public async Task CanEditCreatedDonation() //eventually
    //{
    //    var newDonation = new DtoDonation()
    //    {
    //        Description = "Marathon2",
    //        Location = "Snow"
    //    };

    //    var createdDonation = (await GetDonationController().Add(newDonation)).Value;

    //    var changedDonation = createdDonation with { Description = "This is changed" };
    //    await GetDonationController().Edit(changedDonation, changedDonation.ID);

    //    var returnedDonation = (await GetDonationController().GetByID(createdDonation.ID)).Value;
    //    returnedDonation.Description.Should().Be("This is changed");
    //}

    //[Test]
    //public async Task CanEditCreatedDonationWithTitle() //eventually
    //{
    //    var newDonation = new DtoDonation()
    //    {
    //        Title = "Best title",
    //        Description = "Marathon2",
    //        Location = "Snow"
    //    };

    //    var createdDonation = (await GetDonationController().Add(newDonation)).Value;

    //    var changedDonation = createdDonation with { Title = "This is changed" };
    //    await GetDonationController().Edit(changedDonation, changedDonation.ID);

    //    var returnedDonation = (await GetDonationController().GetByID(createdDonation.ID)).Value;
    //    returnedDonation.Title.Should().Be("This is changed");
    //}

    //[Test]
    //public async Task CanDeleteDonation()
    //{
    //    var newDonation = new DtoDonation()
    //    {
    //        Description = "Marathon2",
    //        Location = "Snow"
    //    };
    //    var createdDonation = (await GetDonationController().Add(newDonation)).Value;

    //    await GetDonationController().Delete(createdDonation.ID);

    //    var badDonationResult = await GetDonationController().GetByID(createdDonation.ID);
    //    var result = badDonationResult.Result as NotFoundObjectResult;
    //    result.StatusCode.Should().Be(404);
    //    result.Value.Should().Be("Donation id does not exist");
    //}

    //[Test]
    //public async Task BadDeleteRequestReturnsBadRequest()
    //{
    //    var badDeleteResult = await GetDonationController().Delete(-1);
    //    var result = badDeleteResult as NotFoundObjectResult;
    //    result.StatusCode.Should().Be(404);
    //    result.Value.Should().Be("Donation id does not exist");
    //}
}
