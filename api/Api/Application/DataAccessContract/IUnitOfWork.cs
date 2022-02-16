using Application.Shared;
using System.Threading.Tasks;

namespace Application.DataAccessContract
{
    public interface IUnitOfWork
    {
        Task<Result> Complete();
    }
}
