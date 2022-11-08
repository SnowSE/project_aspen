using Api.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TechTalk.SpecFlow;

namespace Tests.Hooks
{
    [Binding]
    public class Hooks
    {
        private static WebApplication host;
        public static int ExposedPort { get; private set; }

        [BeforeTestRun]
        public static void BeforeTestRun()
        {
            var builder = WebApplication.CreateBuilder(new[] {
                "--urls", "http://127.0.0.1:0",
                "--SwaggerBasePath", ""
            });
            builder.Services.AddHostedService<MigrationApplier>();
            builder.Services.AddControllersWithViews();
            builder.Services.AddControllers()
                .PartManager
                .ApplicationParts
                .Add(new AssemblyPart(typeof(EventController).Assembly));
            builder.Services.AddAutoMapper(typeof(AspenMapperProfile));
            builder.Services.AddScoped<IEventRepository, EventRepository>();
            builder.Services.AddScoped<ITeamRepository, TeamRepository>();
            builder.Services.AddScoped<IPageDataRepository, PageDataRepository>();
            builder.Services.AddScoped<IRegistrationRepository, RegistrationRepository>();
            builder.Services.AddScoped<IPersonRepository, PersonRepository>();
            builder.Services.AddScoped<IDonationRepository, DonationRepository>();
            builder.Services.AddScoped<IAssetFileService, AssetFileService>();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AspenContext>(options =>
            {
                options.UseNpgsql(builder.Configuration["ASPEN_TEST_CONNECTION_STRING"]);
            });

            host = builder.Build();

            host.UseStaticFiles();
            host.UseRouting();
            host.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            host.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
            host.MapGet("/api/health", () => "it's working!");
            host.MapGet("/api/routes", (ILogger<Hooks> log, IEnumerable<EndpointDataSource> endpointSources) =>
            {
                log.Log(LogLevel.Information, "Available routes:");
                var endpoints = endpointSources
                     .SelectMany(es => es.Endpoints)
                     .OfType<RouteEndpoint>();
                var output = endpoints.Select(
                    e =>
                    {
                        var controller = e.Metadata
                            .OfType<ControllerActionDescriptor>()
                            .FirstOrDefault();
                        var action = controller != null
                            ? $"{controller.ControllerName}.{controller.ActionName}"
                            : null;
                        var controllerMethod = controller != null
                            ? $"{controller.ControllerTypeInfo.FullName}:{controller.MethodInfo.Name}"
                            : null;
                        return new
                        {
                            Method = e.Metadata.OfType<HttpMethodMetadata>().FirstOrDefault()?.HttpMethods?[0],
                            Route = $"/{e.RoutePattern.RawText.TrimStart('/')}",
                            Action = action,
                            ControllerMethod = controllerMethod
                        };
                    });
                return JsonSerializer.Serialize(output);
            });

            host.Start();

            foreach (var address in host.Urls)
            {
                var parts = address.Split(':');
                ExposedPort = int.Parse(parts[2]);
            }
        }

        [AfterTestRun]
        public static void AfterTestRun()
        {
            host.StopAsync().Wait();
        }
    }
}
