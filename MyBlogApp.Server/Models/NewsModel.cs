namespace MyBlogApp.Server.Models
{
    public class NewsModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public byte[]? Image { get; set; }
        public int? LikesCount { get; set; }
        public DateTime? PostDate {  get; set; }

        public NewsModel() { }

        public NewsModel(int id, string text, byte[] image, DateTime postDate)
        {
            Id = id;
            Text = text;
            Image = image;
            PostDate = postDate;
        }
    }
}
