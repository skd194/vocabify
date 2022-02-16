using System;

namespace Application.DataAccessContract
{
    public interface IWriteDbErrorHandler
    {
        bool IsForeignKeyError(Exception exception);
        bool TryGetConstraintError(Exception exception, out string message);
    }
}
