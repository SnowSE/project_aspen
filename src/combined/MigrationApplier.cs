public class MigrationApplier : IHostedService
{
    private readonly IServiceProvider service;
    private readonly ILogger<MigrationApplier> logger;

    public MigrationApplier(IServiceProvider service, ILogger<MigrationApplier> logger)
    {
        this.service = service;
        this.logger = logger;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = service.CreateScope())
        {
            try
            {
                var context = scope.ServiceProvider.GetRequiredService<AspenContext>();
                logger.LogInformation("Applying migrations...");
                context.Database.Migrate();
                logger.LogInformation("Migrations applied successfully!");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "***  Trouble applying migrations!");

                if (System.Diagnostics.Debugger.IsAttached)
                {
                    logger.LogWarning("Maybe it's a connection string issue, or the database is not up?\n");
                    logger.LogWarning(@"If so, try these commands FROM THE src/combined DIRECTORY:

dotnet user-secrets set ""ASPEN_CONNECTION_STRING"" ""server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1""
docker run -d --name pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=P@assword1 -p 5434:5432 postgres

");
                }
                throw;
            }
            return Task.CompletedTask;
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
