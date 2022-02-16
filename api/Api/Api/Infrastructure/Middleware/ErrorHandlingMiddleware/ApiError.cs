using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net;

namespace Api.Infrastructure
{
    public class ApiError
    {
        #region factory methods
        public static ApiError BadRequest(string errorMessage) =>
            new ApiError(HttpStatusCode.BadRequest, "api-error", errorMessage);

        public static ApiError Unauthorized(string errorMessage) =>
            new ApiError(HttpStatusCode.Unauthorized, "api-error", errorMessage);

        public static ApiError InternalServerErrorResponse() =>
            new ApiError(HttpStatusCode.InternalServerError,
                "InternalServerError",
                "Unexpected error occured. Please contact the support team and provide the id generated along with this response");

        public static ApiError InternalServerErrorResponse(Exception exception) =>
            new ApiError(HttpStatusCode.InternalServerError,
                "InternalServerError",
                exception.Message);

        #endregion

        private ApiError(HttpStatusCode statusCode, string errorKey, string errorMessage)
            : this(statusCode, new Dictionary<string, string> { { errorKey, errorMessage } })
        {
        }

        public ApiError(
            HttpStatusCode statusCode,
            Dictionary<string, string> errors)
        {
            Id = Guid.NewGuid().ToString();
            StatusCode = statusCode;
            Errors = errors;
        }

        public string Id { get; }
        public HttpStatusCode StatusCode { get; }
        public Dictionary<string, string> Errors { get; }
        public string Detail { get; set; } = string.Empty;
        public override string ToString() =>
            JsonConvert.SerializeObject(this,
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
    }
}