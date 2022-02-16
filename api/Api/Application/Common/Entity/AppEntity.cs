using System;

namespace Application
{
    public abstract class AppEntity : Entity<long>, IAppEntityBase, IAccount
    {
        protected AppEntity()
        {
        }

        protected AppEntity(long id)
        {
            Id = id;
        }

        public int AccountId { get; protected set; } = -1;
        public DateTime UpdatedOn { get; protected set; }
        public long UpdatedBy { get; protected set; }
        public byte[] RowVersionStamp { get; protected set; }

        public void UpdateAccount(int accountId)
        {
            AccountId = accountId;
        }

        public void UpdateBase(long updatedBy, DateTime updatedOn)
        {
            UpdatedBy = updatedBy;
            UpdatedOn = updatedOn;
        }
    }
}