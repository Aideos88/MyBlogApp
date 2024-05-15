using LiteDB;

namespace MyBlogApp.Server.Data
{
    public class NoSQLDataService
    {
        private readonly string DBPath = "myLiteDB.db";

        private const string SubsCollection = "SubsCollection";
        private const string NewsLikesCollection = "NewsLikesCollection";

        public UserSubs GetUserSubs(int userId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == userId);

                return subsForUser;
            }
        }

        public UserSubs SetUserSubs(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == from);

                var sub = new UserSub
                {
                    Id = to,
                    Date = DateTime.Now,
                };

                if (subsForUser != null)
                {
                    if (!subsForUser.Users.Select(x => x.Id).Contains(to))
                    {

                        subsForUser.Users.Add(sub);
                        subs.Update(subsForUser);
                    }
                }
                else
                {
                    var newSubsForUser = new UserSubs
                    {
                        Id = from,
                        Users = new List<UserSub> { sub }
                    };
                    subs.Insert(newSubsForUser);
                    subs.EnsureIndex(x => x.Id);
                    subsForUser = newSubsForUser;
                }
                return subsForUser;
            }
        }

        public UserSubs RemoveUserSubs(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == from);

                if (subsForUser != null)
                {
                    var subToRemove = subsForUser.Users.FirstOrDefault(x => x.Id == to);

                    if (subsForUser.Users.Select(x => x.Id).Contains(to) && subToRemove != null)
                    {
                        subsForUser.Users.Remove(subToRemove);
                        subs.Update(subsForUser);
                    }
                }
                //else
                //{
                //    var newSubsForUser = new UserSubs
                //    {
                //        UserId = from,
                //        Users = new List<int> { to }
                //    };
                //    subs.Insert(newSubsForUser);
                //    subs.EnsureIndex(x => x.UserId);
                //    subsForUser = newSubsForUser;
                //}
                return subsForUser;
            }
        }

        public NewsLike GetNewsLikes(int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var newsLikes = likes.FindOne(x => x.NewsId == newsId);
                return newsLikes;
            }
        }

        public NewsLike SetNewsLike(int from, int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var newsLikes = likes.FindOne(x => x.NewsId == newsId);

                if (newsLikes != null)
                {
                    if (!newsLikes.Users.Contains(from))
                    {
                        newsLikes.Users.Add(from);
                        likes.Update(newsLikes);
                    }
                }
                else
                {
                    var newLikeForNews = new NewsLike
                    {
                        NewsId = newsId,
                        Users = new List<int> { from }
                    };
                    likes.Insert(newLikeForNews);
                    likes.EnsureIndex(x => x.NewsId);
                }
                return newsLikes;
            }
        }

        public NewsLike RemoveNewsLike(int from, int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var newsLikes = likes.FindOne(x => x.NewsId == newsId);

                if (newsLikes != null)
                {
                    if (newsLikes.Users.Contains(from))
                    {
                        newsLikes.Users.Remove(from);
                        likes.Update(newsLikes);
                    }
                }
                //else
                //{
                //    var newLikeForNews = new NewsLike
                //    {
                //        NewsId = newsId,
                //        Users = new List<int> { from }
                //    };
                //    likes.Insert(newLikeForNews);
                //    likes.EnsureIndex(x => x.NewsId);
                //}
                return newsLikes;
            }
        }

    }
}
