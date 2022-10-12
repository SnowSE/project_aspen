using Api.Mappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Api;

public class Startup
{
    private readonly string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
    public Startup(IConfiguration config)
    {

        Configuration = config;

    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment CurrentEnvironment { get; set; }
    public static IEnumerable<string> HostedAddresses { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(AspenMapperProfile));
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<ITeamRepository, TeamRepository>();
        services.AddScoped<IPageDataRepository, PageDataRepository>();
        services.AddScoped<IRegistrationRepository, RegistrationRepository>();
        services.AddScoped<IPersonRepository, PersonRepository>();
        services.AddScoped<IDonationRepository, DonationRepository>();
        services.AddScoped<IAssetFileService, AssetFileService>();
        services.AddCors(options =>
        {
            options.AddPolicy(name: myAllowSpecificOrigins,
                            builder =>
                            {
                                builder.AllowAnyMethod()
                                       .AllowAnyHeader()
                                       .AllowAnyOrigin();
                            });
        });
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            o.Authority = Configuration["Jwt:Authority"];
            o.Audience = Configuration["Jwt:Audience"];

            o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidAudiences = new string[] { "aspen" },
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidIssuer = Configuration["Jwt:Issuer"]
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

                    if (CurrentEnvironment.IsDevelopment())
                    {
                        return c.Response.WriteAsync(c.Exception.ToString());
                    }
                    return c.Response.WriteAsync("An error occurred processing your authentication.");
                }
            };
        });

        services.AddControllers();
        services.AddSwaggerGen(c =>
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

        services.AddDbContext<AspenContext>(options => options.UseNpgsql(getConnectionString()));
    }

    private string getConnectionString() =>
        Configuration["ASPEN_CONNECTION_STRING"] ?? Configuration.GetConnectionString("docker");

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime lifetime)
    {
        CurrentEnvironment = env;

        lifetime.ApplicationStarted.Register(() =>
        {
            Startup.HostedAddresses = app.ServerFeatures.Get<IServerAddressesFeature>().Addresses;
        });

        var swaggerBasePath = Configuration["SwaggerBasePath"] ?? "";
        if (!string.IsNullOrEmpty(swaggerBasePath) && swaggerBasePath.Length > 0)
            swaggerBasePath += "/";

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        // https://vmsdurano.com/fixing-swagger-ui-when-in-behind-proxy/
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
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint($"/{swaggerBasePath}swagger/v1/swagger.json", "Aspen API v1");
        });

        app.UseRouting();
        app.UseCors(myAllowSpecificOrigins);

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGet("/api/health", c => c.Response.WriteAsync("ur good (4/13/2022)"));
            endpoints.MapControllers();
        });
    }
}
