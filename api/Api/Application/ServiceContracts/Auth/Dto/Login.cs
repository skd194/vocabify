using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.ServiceContracts
{
    public class LoginDto: IValidatableObject
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            yield return ValidationResult.Success;
        }
    }

    public class LoginResponseDto
    {
        public LoginResponseDto(long userId, string username, string token)
        {
            UserId = userId;
            Username = username;
            Token = token;
        }

        public long UserId { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
    }
}
