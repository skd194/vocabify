using System;

namespace Application
{
    public interface IAppEntityBase
    {
        DateTime UpdatedOn { get; }
        long UpdatedBy { get; }
        byte[] RowVersionStamp { get; }
        void UpdateBase(long updatedBy, DateTime updatedOn);
    }
}