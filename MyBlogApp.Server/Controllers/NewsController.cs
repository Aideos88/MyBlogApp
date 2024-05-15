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
    public class NewsController : ControllerBase
    {
        private NewsService _newsService;
        private UsersService _usersService;

        public NewsController(NewsService newsService, UsersService usersService)
        {
            _newsService = newsService;
            _usersService = usersService;
        }

        [HttpGet("{userId}")]
        public IActionResult GetByAuthor(int userId)
        {
            var news = _newsService.GetByAuthor(userId);
            return Ok(news);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            var news = _newsService.GetNewsForCurrentUser(currentUser.Id);

            return Ok(news);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NewsModel newsModel)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            var newsModelNew = _newsService.Create(newsModel, currentUser.Id);

            return Ok(newsModelNew);
        }
        
        
        [HttpPost("all")]
        public IActionResult Create([FromBody] List<NewsModel> news)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            
            var newsModelNew = _newsService.Create(news, currentUser.Id);

            return Ok(newsModelNew);
        }

        [HttpPatch]
        public IActionResult Update([FromBody] NewsModel newsModel)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            var newsModelNew = _newsService.Update(newsModel, currentUser.Id);

            return Ok(newsModelNew);
        }

        [HttpDelete("{newsId}")]
        public IActionResult Delete(int newsId)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            _newsService.Delete(newsId, currentUser.Id);

            return Ok();
        }

        [HttpPost("like/{newsId}")]
        public IActionResult SetLike(int newsId)
        {
            var currentUser = _usersService.GetUserByLogin(HttpContext.User.Identity.Name);
            if (currentUser == null)
            {
                return BadRequest();
            }
            _newsService.SetLike(newsId, currentUser.Id);

            return Ok();
        }

    }
}
