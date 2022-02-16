using Application.AppContracts;

namespace Api.Infrastructure
{
    public class AnonymousContext : IServiceContext
    {
        public int UserId => 0;
    }
}