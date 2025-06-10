using MediatR;
using Microsoft.AspNetCore.Identity;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record ChangePasswordCommand : IRequest<bool>
    {
        public string Email { get; init; }

        public string NewPassword { get; init; }

        public string Notes { get; init; }

        public ChangePasswordCommand(ChangePasswordModel changePasswordModel)
        {
            Email = changePasswordModel.Email;
            NewPassword = changePasswordModel.NewPassword;
            Notes = changePasswordModel.Notes;
        }
    }

    public class ChangePasswordHandler : IRequestHandler<ChangePasswordCommand, bool>
    {
        private readonly UserManager<UserEntity> _userManager;

        public ChangePasswordHandler(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return false;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);

            if (!result.Succeeded)
                return false;

            user.Reminder = request.Notes;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
                return false;

            return true;
        }
    }
}
