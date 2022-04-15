using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Sinks.Elasticsearch;
using System.Reflection;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();
         Log.Logger = (Serilog.ILogger)new LoggerConfiguration()
        .WriteTo.Console()
        .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(configuration["ElasticConfiguration:Uri"]))
        {
            AutoRegisterTemplate = true,
            IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name.ToLower()}-{DateTime.UtcNow:yyyy-MM}"
        })
        .WriteTo.File("Logs/LogInfo.txt")
        .WriteTo.Seq("http://localhost:5341",
        apiKey: "yeEZyL3SMcxEKUijBjN")
        .CreateLogger();
        var host = CreateHostBuilder(args)
           .ConfigureLogging(logging =>
           {
               logging.ClearProviders();
               logging.AddConsole();
               logging.AddAzureWebAppDiagnostics();
           })
           .Build();
        using (var scope = host.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AspenContext>();
            //dumpLogs(scope, db);
            db.Database.Migrate();
        }
        host.Run();
    }


    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            })
         .UseSerilog();
}
