namespace Persistence
{
    public class DbConstraintMessage
    {
        public DbConstraintMessage(string name, string message)
        {
            Name = name;
            Message = message;
        }
        public string Name { get; }
        public string Message { get; }
    }
}