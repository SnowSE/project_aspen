 using System;
using System.Data;
using Aspen.Core.Data;
using Aspen.Core.Repositories;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;
using System.Threading;
using Aspen.Api.Authentication;

namespace Aspen.Api
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private System.Func<NpgsqlConnection> getDbConnection;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("DefaultConnection");

            services
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    // Add Postgres support to FluentMigrator
                    .AddPostgres()
                    // Set the connection string
                    .WithGlobalConnectionString(connectionString)
                    // Define the assembly containing the migrations
                    .ScanIn(typeof(FirstMigration).Assembly).For.Migrations())
                // Enable logging to console in the FluentMigrator way
                .AddLogging(lb => lb.AddFluentMigratorConsole());

            getDbConnection = () => new NpgsqlConnection(connectionString);
            services.AddTransient<Func<IDbConnection>>(c => getDbConnection);

            services.AddScoped<ICharityRepository, CharityRepository>();
            services.AddScoped<IThemeRepository, ThemeRepository>();

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

            services.AddIdentityServer()
                .AddInMemoryIdentityResources(InMemoryConfig.GetIdentityResources())
                .AddTestUsers(InMemoryConfig.GetUsers())
                .AddInMemoryClients(InMemoryConfig.GetClients())
                .AddInMemoryApiResources(InMemoryConfig.GetApiResources())
                .AddDeveloperSigningCredential(); //remove for prod

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = "oidc";
            })
                .AddCookie("Cookies")
                .AddOpenIdConnect("oidc", options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.RequireHttpsMetadata = false;

                    options.ClientId = "mvc client id";
                    options.ClientSecret = "clientsecret";
                    options.ResponseType = "code";

                    options.SaveTokens = true;

                    options.Scope.Add("api1");
                    // options.Scope.Add("profile");
                });

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IMigrationRunner migrationRunner)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            Thread.Sleep(500);
            migrationRunner.MigrateUp();

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
