using Application.Shared;
using System.Threading.Tasks;

namespace Application.ServiceContracts
{
    public interface IAuthService
    {
        Task<Result<LoginResponseDto>> Login(LoginDto login);
    }
}
