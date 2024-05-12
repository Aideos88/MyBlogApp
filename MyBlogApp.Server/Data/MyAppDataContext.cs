using Microsoft.EntityFrameworkCore;

namespace MyBlogApp.Server.Data
{
    public class MyAppDataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<UserSubs> UserSubs { get; set; }
        public DbSet<NewsLike> NewsLike { get; set; }
        public MyAppDataContext(DbContextOptions<MyAppDataContext> contextOptions) : base(contextOptions)
        {
            Database.EnsureCreated();
        }
    }
}
