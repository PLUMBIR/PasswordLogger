namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public record NoteDto
    {
        public string Id { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string Text { get; init; }
    }
}
