using Microsoft.AspNetCore.Mvc.Versioning.Conventions;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using ZOO_Management.Extensions;
using ZOO_Management.Infrastructure.Models;

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

            /*services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.AllowedForNewUsers = lockoutSettings.Enabled;
                options.Lockout.MaxFailedAccessAttempts = lockoutSettings.Attempts;
                options.Lockout.DefaultLockoutTimeSpan = lockoutSettings.LockoutTimespan;
            })
                .AddUserManager<AppUserManager>()
                .AddEntityFrameworkStores<BuildingsContext>()
                .AddDefaultTokenProviders();

            byte[] key = Encoding.ASCII.GetBytes(Configuration["Secret"]);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        StringValues accessToken = context.Request.Query["access_token"];

                        PathString path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        AppUserManager userManager = context.HttpContext.RequestServices.GetRequiredService<AppUserManager>();
                        Guid userGuid = Guid.Parse(context.Principal.FindFirst("guid").Value);
                        AppUser user = userManager.GetUserByGuidAsync(userGuid).Result;
                        if (user == null || user.IsEnabled != UserEnabled.IsEnabled) context.Fail("Unauthorized");
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });*/
 
            services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/build");

            services.AddApiVersioning(options =>
            {
                options.Conventions.Add(new VersionByNamespaceConvention());
            });

            services.AddCustomSwagger();
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

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment()) spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
