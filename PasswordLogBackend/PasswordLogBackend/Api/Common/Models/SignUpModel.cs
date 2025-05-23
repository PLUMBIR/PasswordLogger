namespace PasswordLogBackend.Api.Common.Models
{
    public record SignUpModel
    {
        public string Email { get; init; }

        public string MasterPassword { get; init; }

        public string Reminder { get; init; }
    }
}
