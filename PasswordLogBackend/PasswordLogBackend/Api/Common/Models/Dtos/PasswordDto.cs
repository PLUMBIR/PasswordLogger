namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public record PasswordDto
    {
        public string Id { get; init; }

        public string Url { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string Username { get; init; }

        public string SitePassword { get; set; }

        public string Notes { get; init; }
    }
}
