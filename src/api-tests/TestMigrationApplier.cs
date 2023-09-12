using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;
using Tests.Hooks;

namespace Tests;

public class TestMigrationApplier : IHostedService
{
    private readonly ILogger<TestMigrationApplier> logger;
    private readonly IServiceProvider serviceProvider;
    private readonly IConfiguration configuration;

    public TestMigrationApplier(ILogger<TestMigrationApplier> logger, IServiceProvider serviceProvider, IConfiguration configuration)
    {
        this.logger = logger;
        this.serviceProvider = serviceProvider;
        this.configuration = configuration;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AspenContext>();
            try
            {
                logger.LogInformation("Applying migrations...");
                await context.Database.MigrateAsync();
                logger.LogInformation("Migrations applied successfully!");
            }
            catch (NpgsqlException ex)
            {
                logger.LogError(ex, "***  Trouble applying migrations!");
                if (Environment.GetEnvironmentVariable(TestConstants.ASPEN_TEST_CONNECTION_STRING) != null)
                {
                    var message = @$"* Unable to apply migrations on test database! *
You have an {TestConstants.ASPEN_TEST_CONNECTION_STRING} environment variable, but it looks like that database is not available.
You can either start that container, or remove that environment variable and a test database container will be created for you.";
                    logger.LogError(message);
                    throw new Exception(message);
                }
            }
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
    }
}
