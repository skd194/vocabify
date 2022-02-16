using System;
using Newtonsoft.Json;

namespace Application.Shared
{
    public class Result
    {
        public bool IsSuccess { get; }
        public string Error { get; }
        public bool IsFailure => !IsSuccess;

        protected Result(bool isSuccess, string error)
        {
            if (isSuccess && error != string.Empty)
            {
                throw new InvalidOperationException(
                    $"Error must be empty for a success result [{nameof(Result)}]");
            }
            IsSuccess = isSuccess;
            Error = error;
        }

        public static Result Ok() => new Result(true, string.Empty);
        public static Result Fail(string error) => new Result(false, error);
        public static Result Fail(Error error) => new Result(false, JsonConvert.SerializeObject(error));

        public static Result<T> Ok<T>(T value) => new Result<T>(value, true, string.Empty);
        public static Result<T> Fail<T>(string error) => new Result<T>(default, false, error);

        public static Result Combine(params Result[] results)
        {
            foreach (var result in results)
            {
                if (result.IsFailure)
                {
                    return result;
                }
            }
            return Ok();
        }

        public Result OnSuccess(Action action)
        {
            if (IsSuccess) action();
            return this;
        }
        public Result OnSuccess(Func<Result> func)
            => IsSuccess ? func() : this;

        public Result OnFailure(Action<string> action)
        {
            if (IsFailure) action(Error);
            return this;
        }

        public Result OnFailure(Action action)
        {
            if (IsFailure) action();
            return this;
        }

        public Result OnBoth(Action<Result> action)
        {
            action(this);
            return this;
        }

        public T OnBoth<T>(Func<Result, T> func)
            => func(this);
    }

    public class Result<T> : Result
    {
        public readonly T Value;

        protected internal Result(
             T value,
            bool isSuccess,
            string error
        )
            : base(isSuccess, error)
        {
            Value = value;
        }

        public Result<T> OnSuccess(Action<T> action)
        {
            if (IsSuccess) action(Value);
            return this;
        }

        public T OnBoth(Func<Result, T> func) => func(this);

        public Result<T> Ensure(
            Func<T, bool> predicate,
            string errorMessage
        )
        {
            if (IsFailure) return this;
            return predicate(Value) ? this : Fail<T>(errorMessage);
        }

        public Result<TR> MapOnSuccess<TR>(Func<T, TR> fn) =>
            IsSuccess
                ? Ok(fn(Value))
                : Fail<TR>(Error);

        public TResult Return<TResult>(
            Func<T, TResult> onSuccessFn,
            Func<TResult> onFailureFn
        ) => IsSuccess
            ? onSuccessFn(Value)
            : onFailureFn();

        public T Return(Action<string> failAction)
        {
            if (IsSuccess) return Value;
            failAction(Error);
            return Value;
        }

        public TResult Return<TResult>(
            Func<T, TResult> onSuccessFn,
            Func<string, TResult> onFailureFn
        ) => IsSuccess
            ? onSuccessFn(Value)
            : onFailureFn(Error);

        public Result<T> WithErrorMessage(string error) =>
            new Result<T>(Value, IsSuccess, IsSuccess ? string.Empty : error);
    }
}
