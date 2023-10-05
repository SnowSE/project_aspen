using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Diagnostics;
using combined.Models.Entities;
using Newtonsoft.Json;
using System.Net.Http;
using static System.Net.WebRequestMethods;
using System.Net;
using shared;
using v2.DataAccess;
using AutoMapper;
using Serilog;

namespace v2.Controllers;
[Route("api/stripe")]
[ApiController]
public class StripeController : ControllerBase
{
    private readonly IConfiguration configuration;
    private readonly IDonationRepository donationRepository;
    private readonly IPaymentFailureRepository paymentFailureRepository;
    private readonly IMapper mapper;


    private static string public_URL = "";
    private HttpClient httpClient = new HttpClient();
    public  string endpointSecret = "";

    public StripeController(IConfiguration configuration, IDonationRepository donationRepository, IPaymentFailureRepository paymentFailureRepository, IMapper mapper)
    {
        this.configuration = configuration;
        this.donationRepository = donationRepository;
        this.paymentFailureRepository = paymentFailureRepository;
        public_URL = configuration["LocalURL"] ?? "https://engineering.snow.edu/aspen/new";
        endpointSecret = configuration["Stripe:LocalWebhookSecret"] ?? Environment.GetEnvironmentVariable("STRIPE_WEBHOOK_SECRET");
        this.mapper = mapper;
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

    [HttpGet("failures"), Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<IEnumerable<DtoPaymentFailure>> GetAll()
    {
        return mapper.Map<IEnumerable<DtoPaymentFailure>>(await paymentFailureRepository.GetAllAsync());
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> Index()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var responseObject = JsonConvert.DeserializeObject<Root>(json);
        var closestEvent = await GetClosestEventAsync();
        long? personId = null;


        var stripeEvent = EventUtility.ConstructEvent(json,
        Request.Headers["Stripe-Signature"], endpointSecret);

        try
        {
            if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
            {
                Console.WriteLine("error", responseObject.data.@object.last_payment_error.decline_code, responseObject.data.@object.last_payment_error.code, responseObject.data.@object.last_payment_error.message);

                var customerService = new CustomerService();
                var currentCustomer = customerService.Get(responseObject.data.@object.customer);
                if (currentCustomer.Name != null)
                {
                    personId = long.Parse(currentCustomer.Name);
                }

                var paymentFailed = new DtoPaymentFailure
                {
                    Amount = responseObject.data.@object.amount,
                    Decline_Code = responseObject.data.@object.last_payment_error.decline_code,
                    Message = responseObject.data.@object.last_payment_error.message,
                    Code = responseObject.data.@object.last_payment_error.code,
                    PersonID = personId,
                    EventID = closestEvent.ID
                };
                try
                {

                    await paymentFailureRepository.Add(paymentFailed);
                    return Ok();

                }
                catch (Exception e)
                {
                    Log.Warning(e.Message, "Stipe Payment Intent Failed");
                    return BadRequest();

                }
            }
        }
        catch(StripeException e)
        {
            return BadRequest(e.Message);
        }
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<string>> payment([FromBody] Payment payment)
    {
        var sessionId = await CheckOut(payment);
        return sessionId;
    }

    [HttpGet("success")]
    public async Task<ActionResult> CheckoutSuccess(long? teamId, long? personId,string? personName, string teamName,string? phoneNumber, string email, decimal amount, string sessionId, string? linkGuid)

    {
        var dateTime = DateTime.UtcNow;
        var session = new SessionService();
        var s = session.Get(sessionId);
        var paymentIntentId = s.PaymentIntentId;


        var newDonation = new DtoDonation {
            TeamID=teamId,
            PersonID=personId,
            Amount=amount/100,
            Date = dateTime,
            TransactionNumber = Guid.NewGuid(),
            LinkGuid = linkGuid
        };
        if(personName == null)
        {
            personName = "Anonymous";
        }
        await donationRepository.AddAsync(newDonation);

        return Redirect($"{public_URL}/successfuldonation/{personName}/{teamName}/{paymentIntentId}/{amount}/{email}/{dateTime.ToLongDateString() + " " +  dateTime.ToLocalTime().ToLongTimeString()}/{phoneNumber}");
    }


    [NonAction]
        public async Task<string> CheckOut(Payment payment)
        {
        // Create a payment flow from the items in the cart.
        // Gets sent to Stripe API.

        var personId = payment.personId.ToString();
        var customer = new CustomerCreateOptions {
            Name = personId,
            Email = payment.donationEmail
        };

        var customerService = new CustomerService();
        var newCustomer = await customerService.CreateAsync(customer);
        var options = new SessionCreateOptions
        {
            // Stripe calls the URLs below when certain checkout events happen such as success and failure.
            //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
            SuccessUrl = $"{public_URL}/api/stripe/success?personId={payment.personId}&&personName={payment.personName}&&teamId={payment.teamId}&&amount={payment.amount}&&email={payment.donationEmail}&&phoneNumber={payment.donationPhoneNumber}&&linkGuid={payment.linkGuid}&&teamName={payment.teamName}&&sessionId=" + "{CHECKOUT_SESSION_ID}",
            CancelUrl = $"{public_URL}/Donate",  // Checkout cancelled.
            Customer = newCustomer.Id,
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
    public string personName { get; set; }
    public string teamName { get; set; }
    public string donationName { get; set; }
    public string donationEmail { get; set; }
    public string? donationPhoneNumber { get; set; }
    public string? linkGuid { get; set; }
}