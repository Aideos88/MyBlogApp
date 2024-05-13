using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using MyBlogApp.Server.Data;
using MyBlogApp.Server.Models;

namespace MyBlogApp.Server.Services
{
    public class NewsService
    {
        private MyAppDataContext _dataContext;
        private NoSQLDataService _noSQLDataService;

        public NewsService(MyAppDataContext dataContext, NoSQLDataService noSQLDataService)
        {
            _dataContext = dataContext;
            _noSQLDataService = noSQLDataService;
        }

        public List<NewsModel> GetByAuthor(int userId)
        {
            var news = _dataContext.News.Where(x => x.AuthorId == userId)
                .Reverse()
                .Select(ToModel)
                .ToList();
            return news;
        }

        public NewsModel Create(NewsModel newsModel, int userId)
        {
            var newNews = new News
            {
                AuthorId = userId,
                Text = newsModel.Text,
                Image = newsModel.Image,
                PostDate = DateTime.Now,
            };

            _dataContext.News.Add(newNews);
            _dataContext.SaveChanges();

            newsModel.Id = newNews.Id;
            return newsModel;
        }

        public NewsModel Update(NewsModel newsModel, int userId)
        {
            var newsToUpdate = _dataContext.News
                .FirstOrDefault(x => x.Id == newsModel.Id && x.AuthorId == userId);

            if (newsToUpdate == null)
            {
                return null;
            }

            newsToUpdate.Text = newsModel.Text;
            newsToUpdate.Image = newsModel.Image;

            _dataContext.News.Update(newsToUpdate);
            _dataContext.SaveChanges();

            return newsModel;
        }

        public void DeleteNews(int newsId, int userId)
        {
            var newsToDelete = _dataContext.News
                .FirstOrDefault(x => x.Id == newsId && x.AuthorId == userId);

            if (newsToDelete == null)
            {
                return;
            }

            _dataContext.News.Remove(newsToDelete);
            _dataContext.SaveChanges();
        }

        public List<NewsModel> GetNewsForCurrentUser(int userId)
        {
            var subs = _noSQLDataService.GetUserSubs(userId);

            var allNews = new List<NewsModel>();

            foreach (var sub in subs.Users)
            {
                var allNewsByAuthor = _dataContext.News.Where(x => x.AuthorId == sub.To);
                allNews.AddRange(allNewsByAuthor.Select(ToModel));
            }

            allNews.Sort(new NewsComparer());

            return allNews;

        }

        public void SetLike(int newsId, int userId)
        {
            _noSQLDataService.SetNewsLike(
                newsId: newsId,
                from: userId);
        }

        private NewsModel ToModel(News news)
        {
            var likes = _noSQLDataService.GetNewsLikes(news.Id);
            var newsModel = new NewsModel(id: news.Id,
                text: news.Text,
                image: news.Image,
                postDate: news.PostDate);

            newsModel.LikesCount = likes.Users.Count;

            return newsModel;
        }

        class NewsComparer : IComparer<NewsModel>
        {
            public int Compare(NewsModel? x, NewsModel? y)
            {
                if (x.PostDate > y.PostDate) return -1;
                if (x.PostDate < y.PostDate) return 1;
                return 0;
            }
        }

    }
}
