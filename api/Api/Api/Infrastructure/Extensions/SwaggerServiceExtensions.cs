using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Api.Infrastructure
{
    internal static class SwaggerServiceExtensions
    {
        internal static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(opts =>
            {
                opts.CustomSchemaIds(x => x.FullName);
                opts.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "<project_name>.Api",
                    Version = "v1"
                });

                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };
                opts.AddSecurityDefinition("Bearer", securitySchema);
                opts.AddSecurityRequirement(new OpenApiSecurityRequirement { { securitySchema, new[] { "Bearer" } } });
            });
            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(opts =>
            {
                opts.SwaggerEndpoint("/swagger/v1/swagger.json", "<project_name>_v1");
                opts.RoutePrefix = string.Empty;
            });
            return app;
        }
    }
}
