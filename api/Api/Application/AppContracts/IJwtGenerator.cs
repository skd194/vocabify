using Application.Domain;

namespace Application.AppContracts
{
    public interface IJwtGenerator
    {
        string CreateToken(User user);
    }
}