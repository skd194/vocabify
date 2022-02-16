namespace Application.Shared
{
    public class Error
    {
        public static Error New(string errorKey, string errorMessage) =>
            new Error(errorKey, errorMessage);

        public static Error New(string errorMessage) =>
            new Error(errorMessage);

        private Error(string errorKey, string errorMessage)
        {
            ErrorKey = errorKey;
            ErrorMessage = errorMessage;
        }
        private Error(string errorMessage)
        {
            ErrorKey = string.Empty;
            ErrorMessage = errorMessage;
        }

        public string ErrorKey { get; }
        public string ErrorMessage { get; }

        public static explicit operator Error(string errorMessage) =>
            new Error(errorMessage);
    }
}
