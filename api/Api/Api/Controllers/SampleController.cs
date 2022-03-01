using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/sample")]
    [ApiController]
    public class SampleController : ControllerBase
    {

        [HttpGet("{id}")]
        public  object Get(int id)
        {
            return new {Message = "Sample text", Id = id};
        }
    }
}