using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

namespace Api.Infrastructure
{
    internal static class ExceptionMiddlewareExtension
    {
        internal static void UseErrorHandlingMiddleware(this IApplicationBuilder builder)
        {
            var options = new ApiExceptionOptions((context, exception, error) =>
            {
                //if (exception.GetType().Name == typeof(SqlException).Name)
                //{
                //    error.Detail = "Exception was a database exception";
                //}
            }, exception =>
            {
                if (exception.Message.StartsWith("cannot open database", StringComparison.InvariantCultureIgnoreCase) ||
                    exception.Message.StartsWith("a network-related", StringComparison.InvariantCultureIgnoreCase))
                {
                    return LogLevel.Critical;
                }

                return LogLevel.Error;
            });

            builder.UseMiddleware<ErrorHandlingMiddleware>(options);
        }
    }
}
