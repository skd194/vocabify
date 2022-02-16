using System.Threading.Tasks;
using Application.AppContracts;
using Application.Domain;
using Application.ServiceContracts;
using Application.Shared;

namespace Application.Services
{
    public class AuthService: IAuthService
    {
        private readonly IJwtGenerator _jwtGenerator;
        public AuthService(IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
        }

        public async Task<Result<LoginResponseDto>> Login(LoginDto login)
        {
            return await Task.Run(() =>
            {
                var userInDb = User.NewUser("NewUser", "Abc@123");

                if (!userInDb.ComparePassword("Abc@123"))
                    return Result.Fail<LoginResponseDto>("Invalid Credentials");

                var jwt = _jwtGenerator.CreateToken(userInDb);
                return Result.Ok(new LoginResponseDto(userInDb.Id, userInDb.Username, jwt));
            });
        }
    }
}
