namespace PasswordLogBackend.Api.Common.Entities.Password
{
    public class PasswordEntity : BaseEntity
    {
        public string Url { get; set; }

        public string Name { get; set; }

        public string Folder { get; set; }

        public string Username { get; set; }

        public string SitePassword { get; set; }

        public string Notes { get; set; }

        protected PasswordEntity()
        {
        }

        public PasswordEntity(string url, string name, string username, string sitePassword)
        {
            Url = url;
            Name = name;
            Username = username;
            SitePassword = sitePassword;
        }
    }
}
