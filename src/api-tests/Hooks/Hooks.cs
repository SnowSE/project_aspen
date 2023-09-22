using v2.Mappers;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using TechTalk.SpecFlow;

namespace Tests.Hooks;

public class TestConstants
{
    public const string ASPEN_TEST_CONNECTION_STRING = "ASPEN_TEST_CONNECTION_STRING";
    public const string DBUserName = "postgres";
    public const string DBUserPassword = "password";
    public static string ContainerPort { get; set; } = "5433";
}

[Binding]
public class TestHook
{
    private static WebApplication host;
    private static string containerId;
    private static DockerClient dockerClient;
    public static int ExposedPort { get; private set; }
    public static string ConnectionString =>
        $"server=localhost; port={TestConstants.ContainerPort}; database=postgres; user id={TestConstants.DBUserName}; password={TestConstants.DBUserPassword}";

    [BeforeTestRun]
    public static async Task BeforeTestRunAsync()
    {
        if (Environment.GetEnvironmentVariable(TestConstants.ASPEN_TEST_CONNECTION_STRING) == null)
            await startDatabaseContainerAsync();

        var builder = WebApplication.CreateBuilder(new[] {
            "--urls", "http://127.0.0.1:0",
            "--SwaggerBasePath", ""
        });
        builder.Services.AddHostedService<TestMigrationApplier>();
        builder.Services.AddControllersWithViews();
        builder.Services.AddControllers()
            .PartManager
            .ApplicationParts
            .Add(new AssemblyPart(typeof(EventController).Assembly));
        builder.Services.AddAutoMapper(typeof(AspenMapperProfile));
        builder.Services.AddScoped<IEventRepository, EventRepository>();
        builder.Services.AddScoped<ITeamRepository, TeamRepository>();
        builder.Services.AddScoped<IPersonRepository, PersonRepository>();
        builder.Services.AddScoped<IDonationRepository, DonationRepository>();
        builder.Services.AddScoped<IAssetFileService, AssetFileService>();
        builder.Services.AddDbContext<AspenContext>(options =>
        {
            options.UseNpgsql(builder.Configuration[TestConstants.ASPEN_TEST_CONNECTION_STRING] ?? ConnectionString);
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
        host.MapGet("/api/routes", (ILogger<TestHook> log, IEnumerable<EndpointDataSource> endpointSources) =>
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

        await host.StartAsync();

        foreach (var address in host.Urls)
        {
            var parts = address.Split(':');
            ExposedPort = int.Parse(parts[2]);
        }
    }

    [AfterTestRun]
    public static async Task AfterTestRunAsync()
    {
        await host.StopAsync();
        if (containerId != null)
            await dockerClient.Containers.RemoveContainerAsync(containerId, new ContainerRemoveParameters { Force = true, RemoveVolumes = true });
    }

    private static async Task startDatabaseContainerAsync()
    {
        dockerClient = await createDockerClientAsync();
        containerId = await createContainerAsync();
        await dockerClient.Containers.StartContainerAsync(containerId, new ContainerStartParameters());
        await waitForDatabaseToComeUp();

        var containerDetails = await dockerClient.Containers.InspectContainerAsync(containerId);
        TestConstants.ContainerPort = containerDetails.NetworkSettings.Ports.FirstOrDefault().Value?.FirstOrDefault()?.HostPort ?? throw new UnableToDetermineContainerPortException();
    }

    private static async Task<DockerClient> createDockerClientAsync()
    {
        if (await dockerIsRunningAsync())
        {
            return new DockerClientConfiguration().CreateClient();
        }
        throw new DockerNotRunningException("Please start the docker daemon before running these tests.");
    }

    private static async Task<bool> dockerIsRunningAsync()
    {
        var dockerPs = Process.Start("docker", "ps");
        await dockerPs.WaitForExitAsync();
        return (dockerPs.ExitCode == 0);
    }

    private static async Task<string> createContainerAsync()
    {
        var containerCreateResponse = await dockerClient.Containers.CreateContainerAsync(new CreateContainerParameters()
        {
            Image = "postgres",
            Env = new List<string>() { $"POSTGRES_PASSWORD={TestConstants.DBUserPassword}" },
            Volumes = new Dictionary<string, EmptyStruct>() { { "../api/backup.sql:/docker-entrypoint-initdb.d/backup.sql", default(EmptyStruct) } },
            HostConfig = new HostConfig
            {
                PortBindings = new Dictionary<string, IList<PortBinding>>
                {
                    {"5432", new List<PortBinding>(){new PortBinding{HostPort = TestConstants.ContainerPort } } }
                },
                PublishAllPorts = true,
            },
            Healthcheck = new HealthConfig
            {
                Test = new List<string>() { "pg_isready" }
            }
        });

        return containerCreateResponse?.ID ?? throw new UnableToCreateTestDatabaseContainerException();
    }

    private static async Task waitForDatabaseToComeUp()
    {
        for (int attempt = 0; ; attempt++)
        {
            if (attempt >= 10)
            {
                throw new TestDatabaseContainerWillNotRespondException();
            }

            var isReadyProcess = Process.Start("docker", $"exec {containerId} pg_isready");
            await isReadyProcess.WaitForExitAsync();
            if (isReadyProcess.ExitCode == 0)
                break;
            await Task.Delay(TimeSpan.FromSeconds(1));
        }
    }
}
