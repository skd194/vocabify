using System;
using Application.DataAccessContract;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace Persistence
{
    public class MySqlWriteDbErrorHandler : IWriteDbErrorHandler
    {
        public bool IsForeignKeyError(Exception exception)
        {
            // implement here
            return false;
        }

        public bool TryGetConstraintError(Exception exception, out string message)
        {

            if (exception is DbUpdateException dbUpdateException &&
                dbUpdateException.InnerException is MySqlException mySqlException)
            {
                foreach (var (constraintName, msg) in DbConstrainHandler.ConstraintMessage)
                {
                    if (mySqlException.Message.Contains(constraintName))
                    {
                        message = msg;
                        return true;
                    }
                }
            }
            message = string.Empty;
            return false;
        }
    }
}