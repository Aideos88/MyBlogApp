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
        public NewsController(NewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("{userId}")]
        public IActionResult GetByAuthor(int userId)
        {
            var news = _newsService.GetByAuthor(userId);
            return Ok(news);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NewsModel newsModel) {
        
        }
        public void Update() { }
        public void Delete() { }


    }
}
