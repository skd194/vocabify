using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Api.Infrastructure
{
    internal class ApiExceptionOptions
    {
        internal ApiExceptionOptions(
            Action<HttpContext, Exception, ApiError> addResponseDetails,
            Func<Exception, LogLevel> determineLogLevel)
        {
            AddResponseDetails = addResponseDetails;
            DetermineLogLevel = determineLogLevel;
        }

        public Action<HttpContext, Exception, ApiError> AddResponseDetails { get; }
        public Func<Exception, LogLevel> DetermineLogLevel { get; }
    }
}