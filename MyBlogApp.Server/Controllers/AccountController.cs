using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlogApp.Server.Models;

namespace MyBlogApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
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
            throw new NotImplementedException();
        }
    }
}
