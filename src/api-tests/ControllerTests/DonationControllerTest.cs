﻿using Api.Extensions;
using Microsoft.Extensions.Logging;
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
            Amount = 1_000M,
            Date = new DateTime(1775, 7, 4).SetKindUtc()
        };

        donationController = GetDonationController();
        dtoDonation = (await donationController.Add(unassignedDonation)).Value;

        var personController = PersonControllerTest.GetPersonController();
        team1Owner = (await personController.Add(new DtoPerson { Name = "Team 1 Owner" })).Value;
        team2Owner = (await personController.Add(new DtoPerson { Name = "Team 2 Owner" })).Value;

        var teamController = TeamControllerTest.GetTeamController();
        team1 = (await teamController.Add(new DtoTeam { Description = "Team1", EventID = testEvent.ID, Name = "Team1", OwnerID = team1Owner.ID, MainImage = testEvent.MainImage })).Value;
        team2 = (await teamController.Add(new DtoTeam { Description = "Team2", EventID = testEvent.ID, Name = "Team2", OwnerID = team2Owner.ID, MainImage = testEvent.MainImage })).Value;


        team1Donations = new[]
        {
            createDonation(100),
            createDonation(200)
        };

        team2Donations = new[]
        {
            createDonation(300),
            createDonation(400)
        };

        foreach (var donation in team1Donations.Union(team2Donations))
        {
            await donationController.Add(donation);
        }
    }

    private DtoDonation createDonation(decimal amount)
    {
        return new DtoDonation
        {
            Amount = amount,
            Date = new DateTime(1775, 7, 4).SetKindUtc(),
            IsPledge = false,
            TransactionNumber = Guid.NewGuid(),
            AuthorizationNumber = ""
    };
    }

    [Test]
    public async Task CanCreateDonation()
    {
        dtoDonation.ID.Should().NotBe(0);
    }

/*    [Test]
    public async Task CanSumDonationsForATeam()
    {
        var actualTeam1Sum = (await donationController.GetTeamDonationSum(testEvent.ID, team1.ID)).Value;
        var expectedTeam1Sum = team1Donations.Sum(d => d.Amount);
        actualTeam1Sum.Should().Be(expectedTeam1Sum);
    }*/

/*    [Test]
    public async Task CanSumDonationsForTeam2()
    {
        var actualTeam2Sum = (await donationController.GetTeamDonationSum(testEvent.ID, team2.ID)).Value;
        var expectedTeam2Sum = team2Donations.Sum(d => d.Amount);
        actualTeam2Sum.Should().Be(expectedTeam2Sum);
    }*/

/*    [Test]
    public async Task CanSumDonationsForAnEntireEvent()
    {
        var actualDonationsSum = (await donationController.GetEventDonationSum(testEvent.ID)).Value;
        var expectedDonationSum = team1Donations.Union(team2Donations).Sum(d => d.Amount) + dtoDonation.Amount;
        actualDonationsSum.Should().Be(expectedDonationSum);
    }*/

/*    [Test]
    public async Task GetActualDonationsForEvent()
    {
        var adminController = AdminControllerTest.GetAdminController();
        var actualDonationsList = await adminController.GetEventDonations(testEvent.ID);
        var expectedDonationsList = new List<DtoDonation>();
        expectedDonationsList.Add(dtoDonation);
        expectedDonationsList.AddRange(team1Donations);
        expectedDonationsList.AddRange(team2Donations);

        actualDonationsList.Should().BeEquivalentTo(expectedDonationsList, options => options.Excluding(d => d.ID));
    }*/

/*    [Test]
    public async Task GetActualDonationsForTeam()
    {
        var adminController = AdminControllerTest.GetAdminController();
        var actualDonationsList = await adminController.GetTeamDonations(testEvent.ID, team1.ID);
        var expectedDonationsList = team1Donations;

        actualDonationsList.Should().BeEquivalentTo(expectedDonationsList, options => options.Excluding(d => d.ID));
    }*/
}
