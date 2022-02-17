using Application.DataAccessContract.Repository;
using Application.Domain;
using Application.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Persistence.DataAccess.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DataContext _dbContext;
        public UserRepository(DataContext dbContext)
            : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Result<User>> GetUserAsync(string username)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Username == username.ToLower());

            return user == null
                ? Result.Fail<User>($"User with username '{username}' not found")
                : Result.Ok(user);
        }

        public async Task<bool> AnyUserWithUsernameExists(string username)
        {
            return await _dbContext.Users.AnyAsync(x => x.Username == username.ToLower());
        }
    }
}
