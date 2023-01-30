using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace Api.Controllers;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationRepository;
        private static string client_URL = "";
        public StripeController(IConfiguration configuration, IDonationRepository donationRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
        }


    [HttpGet("test")]
    public async Task<ActionResult> TestGet()
    {



        return Redirect($"https://engineering.snow.edu/aspen/new/successfuldonation/{"person"}/{"personTeam"}/{"bob"}");
        


    }


    [HttpPost]
    public async Task<ActionResult<CheckoutOrderResponse>> payment([FromBody] Payment payment)
    {
        //var referer = Request.Headers.Referer;
        //client_URL = referer[0];


        var key = Environment.GetEnvironmentVariable("testKey")?? "no secret key";


        //var sessionId = await CheckOut(payment);
       // var publicKey = configuration["Stripe:PublicKey"];

        var checkoutOrderResponse = new CheckoutOrderResponse()
        {
            SessionId = "mysessionID",
            publicKey = key
        };

        //string url = $"https://checkout.stripe.com/pay/{sessionId}";
        return checkoutOrderResponse;
    }

        [HttpGet("success")]
        // Automatic query parameter handling from ASP.NET.
        // Example URL: https://localhost:7051/checkout/success?sessionId=si_123123123123
        public async Task<ActionResult> CheckoutSuccess(long eventId, long? teamId, long? personId,string? personName, string teamName, decimal amount, string sessionId, string email, string? phoneNumber, string donationDateTime)
        {
            var dateTime = DateTime.UtcNow;
            var session = new SessionService();

        var s = session.Get(sessionId);
        var paymentIntentId = s.PaymentIntentId;

        var newDonation = new Donation {
            EventID=eventId,
            TeamID=teamId,      
            PersonID=personId,
            Amount=amount/100,
            Date = dateTime,
            TransactionNumber = Guid.NewGuid()
        };


        await donationRepository.AddAsync(newDonation);

        return Redirect($"https://engineering.snow.edu/aspen/new/successfuldonation/{personName}/{teamName}/{paymentIntentId}");
    }

        [NonAction]
        public async Task<string> CheckOut(Payment payment)
        {
            // Create a payment flow from the items in the cart.
            // Gets sent to Stripe API.
            var options = new SessionCreateOptions
            {
                // Stripe calls the URLs below when certain checkout events happen such as success and failure.
                //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
                SuccessUrl = $"https://localhost:44478/aspen/new/api/stripe/success?eventId={payment.eventId}&&personId={payment.personId}&&personName={payment.personName}&&teamId={payment.teamId}&&amount={payment.amount}&&email={payment.donationEmail}&&phoneNumber={payment.donationPhoneNumber}&&paymentDate={payment.donationDateTime}&&teamName={payment.teamName}&&sessionId="+"{CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:44478/aspen/new/Donate",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> // Only card available in test mode?
            {
                "card"
            },
                LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = payment.amount, // Price is in USD cents.
                        Currency = "USD",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = payment.teamName,
                            Description = payment.teamName + " Donation"
                            //Images = new List<string> { payment.teamName }
                        },
                    },
                    Quantity = 1,
                },
            },
                Mode = "payment" // One-time payment. Stripe supports recurring 'subscription' payments.
            };

        var service = new SessionService();
        var session = await service.CreateAsync(options);
        return session.Id;
    }







}


public class Payment {
    public int amount { get; set; }
    public string id { get; set; }
    public int? teamId { get; set; }
    public int? personId { get; set; }
    public int eventId { get; set; }
    public string personName { get; set; }
    public string teamName { get; set; }
    public string donationName { get; set; }
    public string donationEmail { get; set; }
    public string donationPhoneNumber { get; set; }
    public string donationDateTime { get; set; }

}

public class CheckoutOrderResponse
{
    public string SessionId { get; set; }
    public string publicKey { get; set; }
}