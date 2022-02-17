using Api.Infrastructure;
using Application.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<NewUserResponseDto>> CreateUser(NewUserDto request)
        {
            var result = await _userService.CreateUser(request);
            return result.ToActionResult();
        }
    }
}
