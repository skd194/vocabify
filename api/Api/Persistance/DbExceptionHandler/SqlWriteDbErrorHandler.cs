using Application.DataAccessContract;
using System;

namespace Persistence
{
    public class SqlWriteDbErrorHandler: IWriteDbErrorHandler
    {
        public bool IsForeignKeyError(Exception exception)
        {
            //return exception is DbUpdateException dbUpdateException &&
            //       dbUpdateException.InnerException is SqlException sqlException &&
            //       sqlException.Number == 547;
            return false;
        }

        public bool TryGetConstraintError(Exception exception, out string message)
        {
            //if (exception is DbUpdateException dbUpdateException &&
            //    dbUpdateException.InnerException is SqlException sqlException)
            //{
            //    foreach (var (constraintName, msg) in DbConstrainHandler.ConstraintMessage)
            //    {
            //        if (!sqlException.Message.Contains(constraintName)) continue;
            //        message = msg;
            //        return true;
            //    }
            //}
            //message = string.Empty;
            //return false;

            message = string.Empty;
            return false;
        }
    }
}
