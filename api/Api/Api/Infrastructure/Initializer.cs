using System.Linq;
using Application.AppContracts;
using Application.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.DataAccess;

namespace Api.Infrastructure
{
    internal class Initializer
    {
        internal static void Seed(IConfiguration configuration)
        {
            var services = new ServiceCollection();
            services.AddDataContext(configuration);
            services.AddScoped<IServiceContext, AnonymousContext>();
            using var provider = services.BuildServiceProvider();
            var dbContext = provider.GetRequiredService<DataContext>();
            if (dbContext.Users.Any()) return;
            dbContext.Users.Add(User.NewUser("admin", "Abc@123"));
            dbContext.SaveChanges();
        }
    }
}