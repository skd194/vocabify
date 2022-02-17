using Application.Domain;
using Application.Shared;
using System.Threading.Tasks;

namespace Application.DataAccessContract.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<Result<User>> GetUserAsync(string username);

        Task<bool> AnyUserWithUsernameExists(string username);
    }
}
