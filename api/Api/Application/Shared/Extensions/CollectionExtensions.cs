using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Extensions
{
    public static class CollectionExtensions
    {
        public static void RemoveRange<T>(this HashSet<T> @this, IEnumerable<T> items)
        {
            foreach (var item in items)
            {
                @this.Remove(item);
            }
        }

        public static void AddRange<T>(this HashSet<T> @this, IEnumerable<T> items)
        {
            foreach (var item in items)
            {
                @this.Add(item);
            }
        }
        public static bool IsEquals<T>(this IEnumerable<T> collection1, IEnumerable<T> collection2)
            where T : IComparable<T>
        {
            var array1 = collection1.ToArray();
            var array2 = collection2.ToArray();
            if (array1.Length != array2.Length) return false;
            return !array1.Where((item1, index) => item1.CompareTo(array2[index]) != 0).Any();
        }

        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            if (source == null) throw new ArgumentNullException(nameof(source));
            if (action == null) throw new ArgumentNullException(nameof(action));
            foreach (var item in source)
            {
                action(item);
            }
        }
    }
}
