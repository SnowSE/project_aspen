namespace Tests.ControllerTests;

public class AdminControllerTest
{
    private AdminController adminController;
    private ClaimsPrincipal adminUser;

    public static AdminController GetAdminController()
    {
        AspenContext context = TestHelpers.CreateContext();
        IDonationRepository donationRepository = new DonationRepository(context, TestHelpers.AspenMapper);
        IAdminService adminService = new AdminService(donationRepository, TestHelpers.AspenMapper);
        return new AdminController(adminService);
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
