﻿namespace MyBlogApp.Server.Models
{
    public class NewsModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public int? LikesCount { get; set; }
        public DateTime? PostDate {  get; set; }
    }
}
