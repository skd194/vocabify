using Application.Shared;
using System.Threading.Tasks;

namespace Application.ServiceContracts
{
    public interface IUserService
    {
        Task<Result<NewUserResponseDto>> CreateUser(NewUserDto user);
    }
}
