using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;

namespace Api.Infrastructure
{
    internal static class ExceptionMiddlewareExtension
    {
        internal static void UseErrorHandlingMiddleware(this IApplicationBuilder builder)
        {
            var options = new ApiExceptionOptions((context, exception) => exception switch
            {
                // handle other system defined exceptions
                _ => ApiError.InternalServerErrorResponse(
                    exception.GetType().Name == typeof(MySqlException).Name
                        ? "DatabaseError"
                        : "InternalServerError",
                    exception)
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