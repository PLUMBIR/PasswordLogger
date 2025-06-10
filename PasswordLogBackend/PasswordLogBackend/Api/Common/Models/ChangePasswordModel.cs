namespace PasswordLogBackend.Api.Common.Models
{
    public record ChangePasswordModel
    {
        public string Email { get; init; }

        public string NewPassword { get; init; }

        public string Notes { get; init; }
    }
}
