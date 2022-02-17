using Api.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers()
                .AddNewtonsoftJson()
                .ConfigureApiBehaviorOptions(opt => opt.InvalidModelStateResponseFactory = context => context.ToBadRequestObjectResult());

            services.RegisterDependencies(Configuration);

            DbConstrainHandler.Register();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddSwaggerDocumentation();
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

            app.UseCors(builder =>
                builder.WithOrigins(Configuration
                        .GetSection("AppSettings:AllowedCors")
                        .Get<string[]>())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            );

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseErrorHandlingMiddleware();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSwaggerDocumentation();

            app.UsePathBase(new PathString("/api"));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();

#if !DEBUG
                endpoints.MapFallbackToController("Index", "Fallback");
#endif
            });
        }
    }
}
