using Application.ServiceContracts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("sample")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly IUserService _userService;

        public SampleController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public  object Get(int id)
        {
            return new {Message = "Sample text", Id = id};
        }
    }
}