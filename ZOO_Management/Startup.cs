using Microsoft.AspNetCore.Mvc.Versioning.Conventions;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using ZOO_Management.ApplicationServices.Services.Nastambe;
using ZOO_Management.ApplicationServices.Services.Sektori;
using ZOO_Management.ApplicationServices.Services.VrstaZivotinje;
using ZOO_Management.ApplicationServices.Services.Zivotinje;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainServices.Interfaces.Repositories;
using ZOO_Management.Extensions;
using ZOO_Management.Infrastructure.Repositories;

namespace ZOO_Management
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            //ConfigureDatabase
            var c = Configuration.GetConnectionString("ZOO_DB");
            services.AddDbContext<ZOO_infsusContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ZOO_DB")));
 
            services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/build");

            services.AddApiVersioning(options =>
            {
                options.Conventions.Add(new VersionByNamespaceConvention());
            });

            services.AddCustomSwagger();

            //SERVICES
            services.AddScoped<INastambeService, NastambeService>();
            services.AddScoped<IZivotinjeService, ZivotinjeService>();
            services.AddScoped<ISektorService, SektorService>();
            services.AddScoped<IVrstaZivotinjeService, VrstaZivotinjeService>();

            //REPOSITORIES
            services.AddScoped<INastambeRepository, NastambeRepository>();
            services.AddScoped<IZivotinjeRepository, ZivotinjeRepository>();
            services.AddScoped<ISektoriRepository, SektoriRepository>();
        }

        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.ConfigureCustomExceptionMiddleware();

            if (Configuration.GetSection("UseSwagger").Get<bool>())
            {
                app.UseCustomSwagger();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
            });
            try
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";
                    if (env.IsDevelopment()) spa.UseReactDevelopmentServer(npmScript: "start");
                });

            }catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
