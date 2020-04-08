using System;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading;
using Aspen.Core.Services;
using Aspen.Core.Models;
using System.Threading.Tasks;
using System.Linq;
using Npgsql;
using System.IO;
using Aspen.Api.Helpers;
using Aspen.Api.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Aspen.Api
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private ConnectionString connectionString;

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            // var passfilePath = Environment.GetEnvironmentVariable("PGPASSFILE");
            // var connectionStringBuilder = new NpgsqlConnectionStringBuilder();
            // connectionStringBuilder.Passfile = passfilePath;

            // var alltext = File.ReadAllText(passfilePath);
            // var passfile = alltext.Split(":");

            // connectionStringBuilder.SslMode = SslMode.Require;
            // connectionStringBuilder.TrustServerCertificate = true;
            // connectionStringBuilder.Host = passfile[0];
            // connectionStringBuilder.Port = int.Parse(passfile[1]);
            // connectionStringBuilder.Database = "Admin";
            // connectionStringBuilder.Username = passfile[3];

            // connectionString = new ConnectionString(connectionStringBuilder.ConnectionString + ";");
            connectionString = new ConnectionString("Host=localhost; Port=5432; Database=Admin; Username=Aspen; Password=Aspen;"); 

            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<ConnectionString>(c => connectionString);
            services.AddScoped<IMigrationService, MigrationService>();
            services.AddScoped<ICharityRepository, CharityRepository>();
            services.AddScoped<IThemeRepository, ThemeRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
               {
                   builder
                       .AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
               });
            });

            services.AddControllers().AddNewtonsoftJson();

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);


            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim("AdminClaim"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            ICharityRepository charityRepository,
            IMigrationService migrationService)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            Thread.Sleep(500);
            var t = new Task(async () =>
            {
                await migrationService.ApplyMigrations(connectionString);
                foreach (var charity in await charityRepository.GetAll())
                    await migrationService.ApplyMigrations(charity.ConnectionString);
            });
            t.Start();
            t.Wait();

            // app.UseHttpsRedirection();

            app.UseRouting();

            // authentication has to be before authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
