using Application;
using Application.AppContracts;
using Application.DataAccessContract;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Persistence;
using Persistence.DataAccess;
using System;

namespace Api.Infrastructure
{
    internal static class RegisterDependencyExtensions
    {
        internal static void RegisterDependencies(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.RegisterServices();

            services.AddSingleton<IJwtGenerator, JwtGenerator>();

            services.AddScoped<IServiceContext, ServiceContext>();

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.RegisterPersistenceDependency(configuration);
        }

        private static void RegisterPersistenceDependency(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDataContext(configuration);

            services.AddSingleton<IWriteDbErrorHandler, MySqlWriteDbErrorHandler>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        internal static void AddDataContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DataContext");

            var mySqlServer = configuration.GetSection("MySqlServerVersion").Value;

            var serverVersion = new MySqlServerVersion(mySqlServer);

            services.AddDbContext<DataContext>(options =>
                    options
                        .UseMySql(connectionString, serverVersion)
#if DEBUG
                        .LogTo(Console.WriteLine, LogLevel.Information)
                        .EnableSensitiveDataLogging()
                        .EnableDetailedErrors()
#endif
            );
        }

        private static void RegisterServices(this IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssemblyOf<AssemblyMarker>()
                .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service")))
                .AsImplementedInterfaces()
                .WithScopedLifetime());
        }
    }
}