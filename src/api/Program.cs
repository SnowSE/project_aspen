using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.Elasticsearch;
using System.Reflection;


namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        var host = CreateHostBuilder(args)
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.AddConsole();
                logging.AddAzureWebAppDiagnostics();
            })
            .Build();

        var config = host.Services.GetRequiredService<IConfiguration>();
        var envName = config["ASPNETCORE_ENVIRONMENT"];
        ConfigureLogging(envName, config);

        using (var scope = host.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AspenContext>();
            //dumpLogs(scope, db);
            try
            {
                db.Database.Migrate();
            }
            catch (Exception ex)
            {
                Console.WriteLine("******************************************************");
                Console.WriteLine("***  Trouble applying migrations!");
                Console.WriteLine("*** " + ex.ToString());
                Console.WriteLine("******************************************************");

                if (System.Diagnostics.Debugger.IsAttached)
                {
                    Console.WriteLine("Maybe it's a connection string issue, or the database is not up?\n");
                    Console.WriteLine(@"If so, try these commands:

dotnet user-secrets set ""ASPEN_CONNECTION_STRING"" ""server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1""
docker run -d --name pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=P@assword1 -p 5434:5432 postgres

");
                }
                throw;
            }

        }
        host.Run();
    }

    private static void ConfigureLogging(string environment, IConfiguration configuration)
    {
        var loggerConfig = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.Debug();
        if (configuration["ELASTICSEARCH_URL"] != null)
        {
            loggerConfig.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(configuration["ELASTICSEARCH_URL"]))
            {
                AutoRegisterTemplate = true,
                AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv6,
                IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name!.ToLower().Replace(".", "-")}-{environment?.ToLower().Replace(".", "-")}-{DateTime.UtcNow:yyyy-MM-dd}"
            });
        }
        loggerConfig
            .ReadFrom.Configuration(configuration);

        Log.Logger = loggerConfig.CreateLogger();
    }


    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            })
        .UseSerilog();

}
