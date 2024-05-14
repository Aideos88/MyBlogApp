using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlogApp.Server.Services;

namespace MyBlogApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private NewsService _newsService;
        private UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            //_newsService = newsService; NewsService newsService,
            _usersService = usersService;
        }

        [HttpGet("{name}")]
        public IActionResult GetUsersByName(string name)
        {
            return Ok(_usersService.GetUsersByName(name));
        }

        [HttpPost("subs/{userId}")]
        public IActionResult SubscribeToUser(int userId)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            if (currentUser.Id != userId)
                _usersService.Subscribe(from: currentUser.Id, to: userId);
            else 
                return BadRequest();

            return Ok();
        }
    }
}
