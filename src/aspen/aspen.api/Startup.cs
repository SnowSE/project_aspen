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

namespace Aspen.Api
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private System.Func<NpgsqlConnection> getDbConnection;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

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
                options.AddDefaultPolicy( builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            // .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
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

            //SeedService.SeedAll(new CharityRepository(getDbConnection));
            

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // endpoints.MapControllerRoute(
                //     "Default",
                //     "{controller}/{action}/{id}",
                //     new { controller = "Home", action = "Get", id = ""},
                //     new { TenantAccess = new CharityRouteConstraint(new CharityRepository(getDbConnection)) } );
                // endpoints.MapControllerRoute(
                //     "Global Admin",
                //     "/admin/{controller}/{action}",
                //     new { controller = "Chartiy", action = "Get"},
                //     new { TenantAccess = new AdminRouteConstraint() } );
            });
        }
    }
}
