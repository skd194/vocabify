using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
    public abstract class DbConstrainHandler
    {
        public static Dictionary<string, string> ConstraintMessage { get; } = new Dictionary<string, string>();

        public static void Register()
        {
            var handlerType = typeof(DbConstrainHandler);

            var handlers = handlerType.Assembly.GetTypes()
                .Where(type => handlerType.IsAssignableFrom(type) && !type.IsAbstract)
                .Select(Activator.CreateInstance);

            foreach (var handler in handlers)
            {
                ((DbConstrainHandler) handler).ConfigureConstraintMessage(Add);
            }
        }

        protected abstract void ConfigureConstraintMessage(Action<DbConstraintMessage> add);

        private static void Add(DbConstraintMessage message)
        {
            ConstraintMessage[message.Name] = message.Message;
        }
    }
}
