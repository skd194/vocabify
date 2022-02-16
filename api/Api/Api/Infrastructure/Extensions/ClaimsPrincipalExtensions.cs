using System;
using System.Security.Claims;

namespace Api.Infrastructure
{
    internal static class ClaimsPrincipalExtensions
    {
        internal static int Get(this ClaimsPrincipal claimsPrincipal, string type)
        {
            if (claimsPrincipal == null) throw new ArgumentNullException(nameof(claimsPrincipal));
            var currentId = claimsPrincipal.FindFirst(type)?.Value;
            if (currentId == null) throw new UnauthorizedAccessException();
            return int.Parse(currentId);
        }

        internal static string GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            if (claimsPrincipal == null) throw new ArgumentNullException(nameof(claimsPrincipal));
            var currentId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return currentId;
        }

        internal static string GetUserName(this ClaimsPrincipal claimsPrincipal)
        {
            if (claimsPrincipal == null) throw new ArgumentNullException(nameof(claimsPrincipal));
            var currentId = claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
            return currentId;
        }
    }
}