using Application.AppContracts;
using Application.DataAccessContract;
using Application.ServiceContracts;
using Application.Shared;
using System.Threading.Tasks;
using System;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IUnitOfWork _unitOfWork;
        public AuthService(IJwtGenerator jwtGenerator, IUnitOfWork unitOfWork)
        {
            _jwtGenerator = jwtGenerator;
            _unitOfWork = unitOfWork;
        }


        public async Task<Result<LoginResponseDto>> Login(LoginDto login)
        {
            var userInDbResult = await _unitOfWork.UserRepository.GetUserAsync(login.Username);
            if (userInDbResult.IsSuccess)
            {
                var userInDb = userInDbResult.Value;
                if (userInDb.ComparePassword(login.Password))
                {
                    var jwt = _jwtGenerator.CreateToken(userInDb);
                    return Result.Ok(new LoginResponseDto(userInDb.Id, userInDb.Username, jwt));
                }
            }
            return Result.Fail<LoginResponseDto>("Invalid credentials");
        }
    }
}
