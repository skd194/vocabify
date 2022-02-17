using Application.AppContracts;
using Application.DataAccessContract;
using Application.Domain;
using Application.ServiceContracts;
using Application.Shared;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService: IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtGenerator _jwtGenerator;

        public UserService(IUnitOfWork unitOfWork, IJwtGenerator jwtGenerator)
        {
            _unitOfWork = unitOfWork;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<Result<NewUserResponseDto>> CreateUser(NewUserDto dto)
        {
            if (await _unitOfWork.UserRepository.AnyUserWithUsernameExists(dto.Username))
                return Result.Fail<NewUserResponseDto>("User with same username already exists.");

            var user = User.NewUser(dto.Username, dto.Password);

            _unitOfWork.UserRepository.Add(user);

            var result =  await _unitOfWork.Complete();

            if (result.IsFailure) return Result.Fail<NewUserResponseDto>(result.Error);

            var jwt = _jwtGenerator.CreateToken(user);

            return Result.Ok(new NewUserResponseDto(user.Id, user.Username, jwt));
        }
    }
}
