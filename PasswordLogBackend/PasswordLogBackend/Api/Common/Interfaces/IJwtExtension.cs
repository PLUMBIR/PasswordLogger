using PasswordLogBackend.Api.Common.Entities;

namespace PasswordLogBackend.Api.Common.Interfaces
{
    public interface IJwtExtension
    {
        Task<string> GenerateTokenAsync(UserEntity user);
    }
}
