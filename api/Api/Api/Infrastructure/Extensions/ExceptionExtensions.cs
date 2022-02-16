using System;

namespace Api.Infrastructure
{
    public static class ExceptionExtensions
    {
        public static Exception GetInnermostException(this Exception exception)
        {
            if (exception == null) throw new ArgumentNullException(nameof(exception));
            while (exception.InnerException != null) exception = exception.InnerException;
            return exception;
        }
    }
}