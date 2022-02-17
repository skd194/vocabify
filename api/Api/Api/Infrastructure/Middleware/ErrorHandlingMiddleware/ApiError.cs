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
        public static ApiError ModelStateError(Dictionary<string, IEnumerable<string>> errors) =>
            new ApiError(HttpStatusCode.BadRequest, "ModelStateError", errors);

        public static ApiError BadRequest(string errorMessage) =>
        new ApiError(HttpStatusCode.BadRequest, "InternalError", errorMessage);

        public static ApiError Unauthorized(string errorMessage) =>
            new ApiError(HttpStatusCode.Unauthorized, "UnAuthorized", errorMessage);

        public static ApiError InternalServerErrorResponse(string type, Exception exception)
        {
#if DEBUG
            return new ApiError(
                HttpStatusCode.InternalServerError,
                type,
                exception.Message);
#else
            return new ApiError(HttpStatusCode.InternalServerError,
                type,
                "Unexpected error occured. Please contact the support team and provide the id generated along with this response");
#endif
        }

#endregion



        private ApiError(HttpStatusCode statusCode, string type, string errorMessage)
            : this(statusCode, type, new Dictionary<string, IEnumerable<string>> { { "error", new[] { errorMessage } } })
        {
        }

        private ApiError(
            HttpStatusCode statusCode,
            string type,
            Dictionary<string, IEnumerable<string>> errors)
        {
            Id = Guid.NewGuid().ToString();
            StatusCode = statusCode;
            Errors = errors;
            Type = type;
        }

        public string Id { get; }
        public HttpStatusCode StatusCode { get; }
        public Dictionary<string, IEnumerable<string>> Errors { get; }
        public string Type { get; }
        public override string ToString() =>
            JsonConvert.SerializeObject(this,
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
    }
}