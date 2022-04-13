using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Sinks.Elasticsearch;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
       ConfigureLogging();
       var host = CreateHostBuilder(args).Build();
        //var host = CreateHostBuilder(args)
        //    .ConfigureLogging(logging =>
        //    {
        //        logging.ClearProviders();
        //        logging.AddConsole();
        //        logging.AddAzureWebAppDiagnostics();
        //    })
        //    .Build();
        using (var scope = host.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AspenContext>();
            //dumpLogs(scope, db);
            db.Database.Migrate();
        }
        host.Run();
    }

    private static void ConfigureLogging()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile(
                    $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json",
                    optional: true)
                .Build();

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Debug()
                .WriteTo.Console()
                .WriteTo.Elasticsearch(ConfigureElasticSink(configuration, environment))
                .Enrich.WithProperty("Environment", environment)
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
            private static ElasticsearchSinkOptions ConfigureElasticSink(IConfigurationRoot configuration, string environment)
        {
            return new ElasticsearchSinkOptions(new Uri(configuration["ElasticConfiguration:Uri"]))
            {
                AutoRegisterTemplate = true,
                IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name.ToLower().Replace(".", "-")}-{environment?.ToLower().Replace(".", "-")}-{DateTime.UtcNow:yyyy-MM}"
            };
        }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
