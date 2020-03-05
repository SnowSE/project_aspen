using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using aspen.api.Routing;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace aspen.api
{
    public class Startup
    {
        private System.Func<NpgsqlConnection> getDbConnection;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ICharityRepository, CharityRepository>();
            services.AddControllers();
            getDbConnection = () => new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"));
            services.AddTransient<Func<IDbConnection>>(c => getDbConnection);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    "Default",
                    "{controller}/{action}/{id}",
                    new { controller = "Home", action = "Get", id = ""},
                    new { TenantAccess = new TenantRouteConstraint() } );
                endpoints.MapControllerRoute(
                    "Global Admin",
                    "/admin/{controller}/{action}",
                    new { controller = "Tenats", action = "Get"},
                    new { TenantAccess = new AdminRouteConstraint() } );
            });
        }
    }
}
