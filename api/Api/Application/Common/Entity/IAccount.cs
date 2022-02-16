namespace Application
{
    public interface IAccount
    {
        int AccountId { get; }
        void UpdateAccount(int accountId);
    }
}