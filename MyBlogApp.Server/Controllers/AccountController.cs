using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyBlogApp.Server.Data;
using MyBlogApp.Server.Models;
using MyBlogApp.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyBlogApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private UsersService _usersService;
        public AccountController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            var currentUser = _usersService.GetUserByLogin(currentUserEmail);

            if (currentUser is null)
            {
                return BadRequest("user = null");
            }
            return Ok(new UserModel
            {
                Id = currentUser.Id,
                Name = currentUser.Name,
                Email = currentUser.Email,
                Description = currentUser.Description,
                Photo = currentUser.Photo,
            });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Create(UserModel user)
        {
            // add user to DB
            var newUser = _usersService.Create(user);
            return Ok(user);
        }

        [HttpPatch]
        public ActionResult<UserModel> Update(UserModel user)
        {
            // check current user from request with user model
            var currentUserEmail = HttpContext.User.Identity.Name;
            var currentUser = _usersService.GetUserByLogin(currentUserEmail);

            if (currentUser != null && currentUser.Id != user.Id)
            {
                return BadRequest();
            }

            // update user in DB
            _usersService.Update(currentUser, user);

            return Ok(user);
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            var currentUser = _usersService.GetUserByLogin(currentUserEmail); 
            _usersService.DeleteUser(currentUser);
            return Ok();
        }

        [HttpPost("token")]
        [AllowAnonymous]
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
