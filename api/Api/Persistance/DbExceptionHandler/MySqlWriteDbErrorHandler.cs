using System;
using Application.DataAccessContract;

namespace Persistence
{
    public class MySqlWriteDbErrorHandler : IWriteDbErrorHandler
    {
        public bool IsForeignKeyError(Exception exception)
        {
            return false;
        }

        public bool TryGetConstraintError(Exception exception, out string message)
        {

            message = string.Empty;
            return false;
        }
    }
}