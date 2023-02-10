using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Diagnostics;
using combined.Models.Entities;
using Newtonsoft.Json;
using System.Net.Http;
using Serilog;

namespace Api.Controllers;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IDonationRepository donationRepository;
        private static string public_URL = "";
        public const string endpointSecret = "whsec_dd905107598f0a108035fc58b344d801eaf59ed1e18c1f1fa385a05bd4439691";

        public StripeController(IConfiguration configuration, IDonationRepository donationRepository)
        private readonly IPaymentFailureRepository paymentFailureRepository;



    private static string public_URL = "";
    private HttpClient httpClient = new HttpClient();
    public const string endpointSecret = "whsec_dd905107598f0a108035fc58b344d801eaf59ed1e18c1f1fa385a05bd4439691";

        public StripeController(IConfiguration configuration, IDonationRepository donationRepository, IPaymentFailureRepository paymentFailureRepository)
        {
            this.configuration = configuration;
            this.donationRepository = donationRepository;
            this.paymentFailureRepository = paymentFailureRepository;

        public_URL = configuration["LocalURL"] ?? "https://engineering.snow.edu/aspen/new";
        }
    [NonAction]
    public async Task<DtoEvent> GetClosestEventAsync()
    {

        var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{public_URL}/api/events");

        DtoEvent closestEvent = new DtoEvent();
        double prev = 0;
        double smallestTime = 0;
        foreach (var item in allEvents)
        {
            var seconds = item.Date - DateTime.Now;
            if (seconds.TotalSeconds > 0)
            {
                smallestTime = seconds.TotalSeconds;
                if (smallestTime < prev || prev == 0)
                {
                    closestEvent = item;
                    prev = smallestTime;
                }
            }
        }
        return closestEvent;
    }
    [HttpPost("webhook")]
        public async Task<ActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var responseObject = JsonConvert.DeserializeObject<Root>(json);
            var closestEvent = await GetClosestEventAsync();

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], endpointSecret);

            // Handle the event
            if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
            {
                Log.Warning(responseObject.data.@object.last_payment_error.decline_code, responseObject.data.@object.last_payment_error.code, responseObject.data.@object.last_payment_error.message, "error");

                var paymentFailed = new PaymentFailure
                {
                    Amount = responseObject.data.@object.amount,
                    Decline_Code = responseObject.data.@object.last_payment_error.decline_code,
                    Message = responseObject.data.@object.last_payment_error.message,
                    Code = responseObject.data.@object.last_payment_error.code,
                    PersonID = 1,
                    EventID = closestEvent.ID
                };
                try
                {

                    await paymentFailureRepository.Add(paymentFailed);

                }
                catch (Exception e)
                {
                    Console.Write(e.Message);

            }
            if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            {
                Log.Information(stripeEvent.Type, "Payment success");

            }
            // ... handle other event types
            if(stripeEvent.Type == Events.ChargeFailed)
            {
                Log.Warning(stripeEvent.Type, "Charge Failed");
            }
            else
            {
                Log.Warning(stripeEvent.Type, "Unhandled event type: {0}");
            }
                return Ok();
            }
            catch (StripeException e)
            {
                Log.Warning(e, "Bad Stripe Request");
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
        public async Task<ActionResult> CheckoutSuccess(long eventId, long? teamId, long? personId,string? personName, string teamName, decimal amount, string sessionId, string email, string? phoneNumber, string donationDateTime, string? linkGuid)

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
            TransactionNumber = Guid.NewGuid(),
            LinkGuid = linkGuid
        };


        await donationRepository.AddAsync(newDonation);

        return Redirect($"{public_URL}/successfuldonation/{personName}/{teamName}/{paymentIntentId}");
    }

        [HttpGet("failure")]
        public ActionResult CheckoutFailure(string sessionId)
        {
            var session = new SessionService();
            var s = session.Get(sessionId);
            var paymentIntentId = s.PaymentIntentId;
            var p = new PaymentIntentService();
            var paymentIntent = p.Get(paymentIntentId);

            return Redirect($"{public_URL}/faileddonation");
        }



    [NonAction]
        public async Task<string> CheckOut(Payment payment)
        {
            // Create a payment flow from the items in the cart.
            // Gets sent to Stripe API.

        // Create a payment flow from the items in the cart.
        // Gets sent to Stripe API.

        var personId = payment.personId.ToString();

        var options = new SessionCreateOptions
            {
                // Stripe calls the URLs below when certain checkout events happen such as success and failure.
                //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
                SuccessUrl = $"{public_URL}/api/stripe/success?eventId={payment.eventId}&&personId={payment.personId}&&personName={payment.personName}&&teamId={payment.teamId}&&amount={payment.amount}&&email={payment.donationEmail}&&phoneNumber={payment.donationPhoneNumber}&&donationDateTime={payment.donationDateTime}&&linkGuid={payment.linkGuid}&&teamName={payment.teamName}&&sessionId=" + "{CHECKOUT_SESSION_ID}",
                CancelUrl = $"{public_URL}/Donate",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> // Only card available in test mode?

        {
            // Stripe calls the URLs below when certain checkout events happen such as success and failure.
            //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
            SuccessUrl = $"{public_URL}/api/stripe/success?eventId={payment.eventId}&&personId={payment.personId}&&personName={payment.personName}&&teamId={payment.teamId}&&amount={payment.amount}&&email={payment.donationEmail}&&phoneNumber={payment.donationPhoneNumber}&&donationDateTime={payment.donationDateTime}&&linkGuid={payment.linkGuid}&&teamName={payment.teamName}&&sessionId=" + "{CHECKOUT_SESSION_ID}",
            CancelUrl = $"{public_URL}/Donate",  // Checkout cancelled.
            PaymentMethodTypes = new List<string> // Only card available in test mode?
            {
                "card"
            },
                CustomerEmail = payment.donationEmail,



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
    public string? linkGuid { get; set; }

}

