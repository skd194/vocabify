using System;
using System.IO;
using Api.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Formatting.Json;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var configuration = GetConfiguration();
            Log.Logger = GetLogger(configuration);
            try
            {
                Log.Information("Starting web host...");
                Initializer.Seed(configuration);
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly. Read logs to know more details");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static ILogger GetLogger(IConfiguration configuration)
        {
            return new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
#if DEBUG
                .WriteTo.Console()
#endif
                .WriteTo.File(
                    new JsonFormatter(),
                    "../logs/log_.json",
                    rollingInterval: RollingInterval.Day,
                    rollOnFileSizeLimit: true,
                    fileSizeLimitBytes: 4000000
                )
                //.WriteTo.Seq("http://localhost:5341")
                .CreateLogger();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        internal static IConfiguration GetConfiguration() =>
            new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
    }
}
