using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlogApp.Server.Models;
using MyBlogApp.Server.Services;

namespace MyBlogApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        //private NewsService _newsService;
        private UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            //_newsService = newsService; NewsService newsService,
            _usersService = usersService;
        }

        [HttpGet("all/{name}")]
        public IActionResult GetUsersByName(string name)
        {
            return Ok(_usersService.GetUsersByName(name));
        }

        [HttpPost("subs/{userId}")]
        public IActionResult Subscribe(int userId)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return NotFound();
            }
            if (currentUser.Id != userId)
                _usersService.Subscribe(from: currentUser.Id, to: userId);
            else
                return BadRequest();

            return Ok();
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            return Ok(_usersService.GetUserProfileById(userId));
        }

        [HttpPost("create")]
        public IActionResult CreateUsers([FromBody] List<UserModel> users)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            if (currentUser.Id != 1)
            {
                return BadRequest();
            }
            var newUsers = _usersService.Create(users);
            return Ok(newUsers);
        }

    }
}
