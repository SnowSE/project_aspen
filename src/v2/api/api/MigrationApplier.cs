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
                    logger.LogWarning(@"If so, try this command FROM THE dev-resources/api DIRECTORY:
docker compose up -d

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
