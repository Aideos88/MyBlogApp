using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyBlogApp.Server.Models;
using MyBlogApp.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyBlogApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private UsersService _usersService;
        public AccountController()
        {
            _usersService = new UsersService();
        }

        [HttpGet]
        public IActionResult Get()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Create(UserModel user)
        {
            // add user to DB

            return Ok(user);
        }

        [HttpPatch]
        public ActionResult<UserModel> Update(UserModel user)
        {
            // check current user from request with user model
            // update user in DB

            return Ok(user);
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult GetToken()
        {
            // get user data from db
            var userData = _usersService.GetUserLoginPassFromBasicAuth(Request);
            // get identity
            (ClaimsIdentity claim, int id)? identity = _usersService.GetIdentity(userData.login, userData.password);
            if (identity is null) return NotFound("Login or password is not correct");
            // create token

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity?.claim.Claims,
                expires: now.AddMinutes(AuthOptions.LIFETIME),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            // return token
            var tokenModel = new AuthToken(
                minutes: AuthOptions.LIFETIME,
                accessToken: encodedJwt,
                userName: userData.login,
                userId: identity.Value.id
                );
            return Ok(tokenModel);
        }
    }
}
