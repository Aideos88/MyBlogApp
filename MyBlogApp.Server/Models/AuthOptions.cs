using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MyBlogApp.Server.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";

        public const string AUDIENCE = "MyAuthClient";

        const string KEY = "MySuperSecretKey_absoluteSecreteKey1234567890";

        public const int LIFETIME = 10;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
