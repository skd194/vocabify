using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Api.Infrastructure
{
    internal class ApiExceptionOptions
    {
        internal ApiExceptionOptions(
            Func<HttpContext, Exception, ApiError> buildErrorResponse,
            Func<Exception, LogLevel> determineLogLevel)
        {
            BuildErrorResponse = buildErrorResponse;
            DetermineLogLevel = determineLogLevel;
        }

        public Func<HttpContext, Exception, ApiError> BuildErrorResponse { get; }
        public Func<Exception, LogLevel> DetermineLogLevel { get; }
    }
}