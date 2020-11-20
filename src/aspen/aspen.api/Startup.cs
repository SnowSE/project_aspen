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
using Dapper;
using System.Text.RegularExpressions;

namespace Aspen.Api
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private ConnectionString connectionString;

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            string validConnString = getConnectionStringFromConfig();
            connectionString = new ConnectionString(validConnString);

            Configuration = configuration;
        }

        private static string getConnectionStringFromConfig()
        {
            var passfilePath = Environment.GetEnvironmentVariable("PGPASSFILE");
            var connectionStringBuilder = new NpgsqlConnectionStringBuilder();
            var alltext = File.ReadAllText(passfilePath);
            var passfile = alltext.Split(":");

            connectionStringBuilder.SslMode = SslMode.Prefer;
            connectionStringBuilder.TrustServerCertificate = true;
            connectionStringBuilder.Host = passfile[0];
            connectionStringBuilder.Port = int.Parse(passfile[1]);
            connectionStringBuilder.Database = "admin";
            connectionStringBuilder.Username = passfile[3];
            connectionStringBuilder.Password = passfile[4];

            var validConnString = connectionStringBuilder.ConnectionString.Replace("\n", "") + ";";
            return validConnString;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<ConnectionString>(c => connectionString);
            services.AddScoped<IMigrationService, MigrationService>();
            services.AddScoped<ICharityRepository, CharityRepository>();
            services.AddScoped<IThemeRepository, ThemeRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IUserService, UserService>();

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

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);


            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services
                .AddAuthentication(x =>
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

            services.AddControllers().AddNewtonsoftJson();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim("AdminClaim"));
            });
        }

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
            applyDatabaseMigrations(charityRepository, migrationService);

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

        private void applyDatabaseMigrations(ICharityRepository charityRepository, IMigrationService migrationService)
        {
            Thread.Sleep(500);
            var t = new Task(async () =>
            {
                await migrationService.ApplyMigrations(connectionString);
                foreach (var charity in await charityRepository.GetAll())
                    await migrationService.ApplyMigrations(charity.ConnectionString);
            });
            t.Start();
            t.Wait();
        }
    }
}
