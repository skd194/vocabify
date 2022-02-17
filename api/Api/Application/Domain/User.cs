using Application.Extensions;
using System.Security.Cryptography;
using System.Text;

namespace Application.Domain
{
    public class User: AppEntity, IAnonymous
    {
        public static User NewUser(string username, string password)
        {
            using var hmac = new HMACSHA512();
            return new User(
                0,
                username.ToLower(),
                ComputePasswordHash(hmac, password),
                hmac.Key);
        }

        private User()
        {
        }

        public User(int id, string username, byte[] passwordHash, byte[] passwordSalt)
            : this()
        {
            Id = id;
            Username = username;
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;
        }

        public string Username { get; protected set; }
        public byte[] PasswordHash { get; protected set; }
        public byte[] PasswordSalt { get; protected set; }

        public bool ComparePassword(string password)
        {
            using var hmac = new HMACSHA512(PasswordSalt);
            return ComputePasswordHash(hmac, password).IsEquals(PasswordHash);
        }

        private static byte[] ComputePasswordHash(
            HashAlgorithm hmac,
            string password) =>
            hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }
}