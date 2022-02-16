using System;

namespace Application.Shared
{
    public abstract class ValueObject<T> : IEquatable<T>
        where T : ValueObject<T>
    {
        public abstract bool EqualsCore(T other);
        protected abstract int GetHashCodeCore();

        public override int GetHashCode()
            =>
                GetHashCodeCore();

        public bool Equals(T other) => EqualsCore(other);

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            return obj is T valueObject && EqualsCore(valueObject);
        }

        public static bool operator ==(
            ValueObject<T> a,
            ValueObject<T> b)
        {
            if (a is null && b is null) return true;
            if (a is null || b is null) return false;
            return a.Equals(b);
        }

        public static bool operator !=(
            ValueObject<T> a,
            ValueObject<T> b)
            => !(a == b);
    }
}