using Application.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Api.Infrastructure
{
    internal static class ResultExtension
    {
        internal static ActionResult<T> ToActionResult<T>(this Result<T> result)
            => result.IsSuccess
                ? (ActionResult<T>)new OkObjectResult(result.Value)
                : new BadRequestObjectResult(ApiError.BadRequest(result.Error));

        internal static ActionResult ToActionResult(this Result result)
            => result.IsSuccess
                ? (ActionResult)new OkResult()
                : new BadRequestObjectResult(ApiError.BadRequest(result.Error));

        internal static ActionResult<T> ToUnAuthorizedActionResult<T>(this Result<T> result)
            => result.IsSuccess
                    ? (ActionResult<T>)new OkObjectResult(result.Value)
                    : new UnauthorizedObjectResult(ApiError.Unauthorized(result.Error));

        internal static ActionResult<TBase> ToActionResult<T, TBase>(this Result<T> result) where T : TBase
            => result.IsSuccess
                ? (ActionResult<TBase>)new OkObjectResult(result.Value)
                : new BadRequestObjectResult(ApiError.BadRequest(result.Error));


        internal static ActionResult ToBadRequestObjectResult(this ActionContext context)
        {
            var errors = context.ModelState
                .Where(modelError => modelError.Value.Errors.Count > 0)
                .ToDictionary(error => error.Key, error => error.Value.Errors.Select(x => x.ErrorMessage));

            return new BadRequestObjectResult(ApiError.ModelStateError(errors));
        }

    }
}