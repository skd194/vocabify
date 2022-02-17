using Application.DataAccessContract.Repository;
using Application.Shared;
using System.Threading.Tasks;

namespace Application.DataAccessContract
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get;  }
        Task<Result> Complete();
    }
}
