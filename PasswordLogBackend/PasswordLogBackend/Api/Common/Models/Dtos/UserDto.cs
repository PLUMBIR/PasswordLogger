namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; }

        public string Reminder { get; set; }

        public string Token { get; set; }
    }
}
