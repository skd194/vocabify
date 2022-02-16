using System;
using System.Threading.Tasks;
using Application.DataAccessContract;
using Application.Shared;

namespace Persistence.DataAccess
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly DataContext _dbContext;
        private readonly IWriteDbErrorHandler _writeDbErrorHandler;

        public UnitOfWork(
            DataContext dbContext,
            IWriteDbErrorHandler writeDbErrorHandler)
        {
            _dbContext = dbContext;
            _writeDbErrorHandler = writeDbErrorHandler;
        }

        public async Task<Result> Complete()
        {
            try
            {
                var result =  await _dbContext.SaveChangesAsync();
                return result > 0
                    ? Result.Ok()
                    : Result.Fail("No data saved to the database");
            }
            catch (Exception exception)
            {
                return _writeDbErrorHandler.IsForeignKeyError(exception)
                    ? Result.Fail(Error.New(
                        "ForeignKeyConstraintError",
                        "Invalid Operation. Entity can't be modified since it is related to other entities"))
                    : _writeDbErrorHandler.TryGetConstraintError(exception, out var message)
                        ? Result.Fail(Error.New("DbConstraintError", message))
                        : Result.Ok();
            }
        }
    }
}
