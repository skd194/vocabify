using System;

namespace Application
{
    public abstract class Entity<T> where T : IEquatable<T>
    {
        public T Id { get; protected set; }
        public override bool Equals(object obj)
            =>
                obj is Entity<T> other &&
                (ReferenceEquals(this, other) ||
                 GetRealType() == other.GetRealType() && Id.Equals(other.Id));

        public static bool operator ==(Entity<T> a, Entity<T> b)
            =>
                a is null && b is null ||
                !(a is null) && !(b is null) &&
                a.Equals(b);

        public static bool operator !=(Entity<T> a, Entity<T> b) => !(a == b);
        public override int GetHashCode() => (GetRealType().ToString() + Id).GetHashCode();
        public Type GetRealType() => GetType();
    }
}