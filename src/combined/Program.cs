using Api.Mappers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AspenMapperProfile));
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IPageDataRepository, PageDataRepository>();
builder.Services.AddScoped<IRegistrationRepository, RegistrationRepository>();
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IDonationRepository, DonationRepository>();
builder.Services.AddScoped<IAssetFileService, AssetFileService>();
builder.Services.AddDbContext<AspenContext>(options =>
{
    var connectionString = builder.Configuration["ASPEN_CONNECTION_STRING"] ?? builder.Configuration.GetConnectionString("docker");
    options.UseNpgsql(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapGet("/api/health", () => "ur good");

app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
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
            Console.WriteLine(@"If so, try these commands FROM THE src/api DIRECTORY:

dotnet user-secrets set ""ASPEN_CONNECTION_STRING"" ""server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1""
docker run -d --name pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=P@assword1 -p 5434:5432 postgres

");
        }
        throw;
    }
}

app.Run();

public partial class Program { }