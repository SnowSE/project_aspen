using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using combined.Models.Entities;
using Newtonsoft.Json;

namespace Api.Controllers;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationRepository;
        private static string client_URL = "";
        public const string endpointSecret = "whsec_dd905107598f0a108035fc58b344d801eaf59ed1e18c1f1fa385a05bd4439691";
        public StripeController(IConfiguration configuration, IDonationRepository donationRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var responseObject = JsonConvert.DeserializeObject<Root>(json);

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], endpointSecret);

                // Handle the event
            if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
            {
                Console.WriteLine("error", responseObject.data.@object.last_payment_error.decline_code, responseObject.data.@object.last_payment_error.code, responseObject.data.@object.last_payment_error.message);

            }
            if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            {
                Console.WriteLine("success");

            }
            // ... handle other event types
            if(stripeEvent.Type == Events.ChargeFailed)
            {
                Console.WriteLine("Charge Failed");
            }
            else
            {
                Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
            }
                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }




    [HttpPost]
    public async Task<ActionResult<string>> payment([FromBody] Payment payment)
    {
        var sessionId = await CheckOut(payment);
        return sessionId;
    }

        [HttpGet("success")]
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

        [HttpGet("failure")]
        public ActionResult CheckoutFailure(string sessionId)
        {
            var session = new SessionService();
            var s = session.Get(sessionId);
            var paymentIntentId = s.PaymentIntentId;
            var p = new PaymentIntentService();
            var paymentIntent = p.Get(paymentIntentId);

            return Redirect($"https://engineering.snow.edu/aspen/new/faileddonation");
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
                SuccessUrl = $"https://engineering.snow.edu/aspen/new/api/stripe/success?eventId={payment.eventId}&&personId={payment.personId}&&personName={payment.personName}&&teamId={payment.teamId}&&amount={payment.amount}&&email={payment.donationEmail}&&phoneNumber={payment.donationPhoneNumber}&&donationDateTime={payment.donationDateTime}&&teamName={payment.teamName}&&sessionId="+"{CHECKOUT_SESSION_ID}",
                CancelUrl = "https://engineering.snow.edu/aspen/new/Donate",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> // Only card available in test mode?
                
            {
                "card"
            },
                CustomerEmail = payment.donationEmail,
                

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

