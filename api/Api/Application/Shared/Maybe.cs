using System;

namespace Application.Shared
{
    public struct Maybe<T> : IEquatable<Maybe<T>>
        where T : class
    {
        private readonly T _value;
        public readonly bool HasValue => _value != null;
        public readonly bool HasNoValue => !HasValue;

        public readonly T Value =>
            HasValue
                ? _value
                : throw new NullReferenceException(
                    $"Error raised from {nameof(Maybe<T>)}");

        private Maybe(T value)
        {
            _value = value;
        }

        public readonly T GetValueOrDefault()
            => HasValue ? _value : default;

        public static implicit operator Maybe<T>( T value)
            => new Maybe<T>(value);

        public static bool operator ==(Maybe<T> maybe, T value)
            => maybe.HasValue && maybe.Value.Equals(value);

        public static bool operator !=(Maybe<T> maybe, T value)
            => !(maybe == value);

        public static bool operator ==(Maybe<T> first, Maybe<T> second)
            => first.Equals(second);

        public static bool operator !=(Maybe<T> first, Maybe<T> second)
            => !(first == second);

        public override bool Equals(object obj)
            => obj is Maybe<T> other && Equals(other);

        public readonly bool Equals(Maybe<T> other)
        {
            if (HasNoValue && other.HasNoValue) return true;
            if (HasNoValue || other.HasNoValue) return false;
            return _value.Equals(other._value);
        }

        public override int GetHashCode()
            => _value.GetHashCode();

        public override string ToString()
            => HasNoValue ? "No Value" : Value.ToString();

        public readonly Result<T> ToResult(string errorMessage) =>
            HasNoValue
                ? Result.Fail<T>(errorMessage)
                : Result.Ok(Value);

        public readonly Result<TResult> MapToResult<TResult>(
            Func<T, TResult> fn,
            string failMessage)
            where TResult : class =>
            HasValue
                ? Result.Ok(fn(Value))
                : Result.Fail<TResult>(failMessage);
    }
}