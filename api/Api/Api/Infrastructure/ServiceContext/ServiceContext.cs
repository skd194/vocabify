using Application.AppContracts;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Api.Infrastructure
{
    public class ServiceContext : IServiceContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ServiceContext(IHttpContextAccessor httpContextAccessor) => _httpContextAccessor = httpContextAccessor;
        public int UserId => _httpContextAccessor.HttpContext.User.Get(ClaimTypes.NameIdentifier);
    }
}