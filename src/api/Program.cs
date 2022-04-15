using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Serilog;
using Serilog.Events;
using Serilog.Sinks.Elasticsearch;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {

        // var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        var environment = "Development";
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            // .AddJsonFile($"appsettings.{environment}.json", optional: true)
            .Build();

        ConfigureLogging(environment, configuration);

        try
        {
            Log.Information("Starting host.");
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AspenContext>();
                //dumpLogs(scope, db);
                db.Database.Migrate();
            }
            host.Run();
        }
        catch (Exception ex)
        {
            // Log.Fatal(ex, "Host failure.");
        }
        finally
        {
            // Log.CloseAndFlush();
        }
    }

    private static void ConfigureLogging(string environment, IConfigurationRoot configuration)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.Debug()
            .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://20.115.165.179:9200"))
            {
                AutoRegisterTemplate = true,
                AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv6,
                IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name!.ToLower().Replace(".", "-")}-{environment?.ToLower().Replace(".", "-")}-{DateTime.UtcNow:yyyy-MM-dd}"
            })
            .ReadFrom.Configuration(configuration)
            .CreateLogger();
    }

    private static void dumpLogs(IServiceScope scope, AspenContext db)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        logger.LogInformation("*#*#*#*  Connection String: " + db.Database.GetConnectionString());
        foreach (var configItem in config.AsEnumerable())
        {
            logger.LogInformation($"{configItem.Key} {configItem.Value}");
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
        .UseSerilog()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
