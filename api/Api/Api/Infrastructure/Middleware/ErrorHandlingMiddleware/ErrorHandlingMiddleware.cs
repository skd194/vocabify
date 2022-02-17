using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Api.Infrastructure
{
    internal class ErrorHandlingMiddleware
    {
        private readonly ApiExceptionOptions _options;
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(
            ApiExceptionOptions options,
            RequestDelegate next,
            ILogger<ErrorHandlingMiddleware> logger)
        {
            _options = options;
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(context, exception, _logger, _options)
                    .ConfigureAwait(false);
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext httpContext,
            Exception exception,
            ILogger logger,
            ApiExceptionOptions options)
        {
            var error = options.BuildErrorResponse.Invoke(httpContext, exception);

            using (logger.BeginScope(ScopeInformation.HostScopeInfo))
            using (logger.BeginScope(ScopeInformation.GetUserScopeInfo(httpContext)))
            {
                logger.Log(
                    options.DetermineLogLevel?.Invoke(exception) ?? LogLevel.Error,
                    exception,
                    "Application Error: {ErrorMessage}, {ErrorId}",
                    exception.GetInnermostException()?.Message,
                    error.Id);
            }

            httpContext.Response.StatusCode = (int)error.StatusCode;

            httpContext.Response.ContentType = System.Net.Mime.MediaTypeNames.Application.Json;

            await httpContext.Response.WriteAsync(error.ToString());
        }
    }

    public static class ScopeInformation
    {
        static ScopeInformation()
        {
            HostScopeInfo = new Dictionary<string, string>
            {
                {"MachineName", Environment.MachineName},
                {"EntryPoint", Assembly.GetEntryAssembly()?.GetName().Name}
            };
        }

        public static Dictionary<string, string> HostScopeInfo { get; }

        public static Dictionary<string, string> GetUserScopeInfo(HttpContext context)
        {
            return new Dictionary<string, string>
            {
                {"UserId", context.User.GetUserId()},
                {"UserName", context.User.GetUserName()}
            };
        }
    }
}