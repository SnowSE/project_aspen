namespace Tests.ControllerTests;

public class AdminControllerTest
{
    private AdminController adminController;
    private ClaimsPrincipal adminUser;

    public static AdminController GetAdminController()
    {
        var context = TestHelpers.CreateContext();
        var donationRepository = new DonationRepository(context, TestHelpers.AspenMapper);
        var eventRepository = new EventRepository(context, TestHelpers.AspenMapper);
        return new AdminController(donationRepository, eventRepository, TestHelpers.AspenMapper);
    }

    [SetUp]
    public void Setup()
    {
        adminController = GetAdminController();
        var userClaims = new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, "testAdmin"),
                new Claim(ClaimTypes.Role, "admin-aspen")
            };
        adminUser = new ClaimsPrincipal(
            new ClaimsIdentity(userClaims, "TestAuthentication")
        );
    }

    [Test]
    public void CanGetFromAdminController()
    {
        adminController.ControllerContext = new ControllerContext();
        adminController.ControllerContext.HttpContext = new DefaultHttpContext { User = adminUser };
        var userClaims = adminController.Get();
        userClaims.Should().NotBeEmpty();
    }
}
