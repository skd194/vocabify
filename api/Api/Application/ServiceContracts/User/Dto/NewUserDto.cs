namespace Application.ServiceContracts
{
    public class NewUserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class NewUserResponseDto
    {
        public NewUserResponseDto(long userId, string username, string token)
        {
            UserId = userId;
            Username = username;
            Token = token;
        }
        public long UserId  { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
    }
}