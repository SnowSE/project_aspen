using Api.Mappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Stripe;
using Serilog;
using Api.DataAccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

// Add services to the container.
var StripeSecretKey = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY") ?? builder.Configuration["Stripe:SecretKey"];

StripeConfiguration.ApiKey = StripeSecretKey;

string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddHostedService<MigrationApplier>();
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AspenMapperProfile));
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IDonationRepository, DonationRepository>();
builder.Services.AddScoped<IAssetFileService, AssetFileService>();
builder.Services.AddScoped<ILinkRepository, LinkRepository>();
builder.Services.AddScoped<ILinkRecordRepository, LinkRecordRepository>();
builder.Services.AddScoped<IPaymentFailureRepository, PaymentFailureRepository>();
builder.Services.AddScoped<IPersonTeamAssoicationRepository, PersonTeamAssoicationRepository>();
builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestProperties;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowAnyOrigin();
                    });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.Authority = builder.Configuration["Jwt:Authority"];
    o.Audience = builder.Configuration["Jwt:Audience"];

    o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidAudiences = new string[] { "aspen", "uma_authorization" },
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"]
    };

    o.RequireHttpsMetadata = false;
    o.Events = new JwtBearerEvents()
    {
        OnAuthenticationFailed = c =>
        {
            Console.WriteLine("Authentication failure");
            Console.WriteLine(c.Exception);

            c.NoResult();

            c.Response.StatusCode = 500;
            c.Response.ContentType = "text/plain";

            if (builder.Environment.IsDevelopment())
            {
                return c.Response.WriteAsync(c.Exception.ToString());
            }
            return c.Response.WriteAsync("An error occurred processing your authentication.");
        }
    };
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnet", Version = "v1" });
    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };
    c.AddSecurityDefinition("Bearer", securitySchema);

    var securityRequirement = new OpenApiSecurityRequirement();
    securityRequirement.Add(securitySchema, new[] { "Bearer" });
    c.AddSecurityRequirement(securityRequirement);
});

Console.WriteLine($"ASPEN_CONNECTION_STRING: {builder.Configuration["ASPEN_CONNECTION_STRING"]}");

builder.Services.AddDbContext<AspenContext>(options =>
{
    var connectionString = builder.Configuration["ASPEN_CONNECTION_STRING"] ?? builder.Configuration.GetConnectionString("docker");
    options.UseNpgsql(connectionString);
});

builder.Host.UseSerilog((hostContext, services, configuration) => {
    configuration.WriteTo.Console()
    .WriteTo.File("logs/apsenLogs.txt", rollingInterval: RollingInterval.Day);
});

var app = builder.Build();

app.UseExceptionHandler();
app.UseHttpLogging();
app.UsePathBase("/aspen/new");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

var swaggerBasePath = builder.Configuration["SwaggerBasePath"] ?? "";
Console.WriteLine($"swaggerbasepath: {swaggerBasePath}");
app.UseSwagger(options =>
{
    options.PreSerializeFilters.Add((swagger, httpReq) =>
    {
        if (httpReq.Headers.ContainsKey("X-Forwarded-Host"))
        {
            var scheme = httpReq.Headers["X-Forwarded-Host"] == "engineering.snow.edu" ? "https" : "http";
            var serverUrl = $"{scheme}://{httpReq.Headers["X-Forwarded-Host"]}/{swaggerBasePath}";
            swagger.Servers = new List<OpenApiServer> { new OpenApiServer { Url = serverUrl } };
        }
    });
});
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(myAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapControllerRoute(
name: "default",
pattern: "{controller}/{action=Index}/{id?}");
app.MapGet("/api/health", () => "ur good");
app.MapFallbackToFile("index.html");

app.Run();

public partial class Program { }
