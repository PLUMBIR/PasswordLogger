using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Interfaces;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record SignUpCommand(string Email, string MasterPassword, string Reminder) : IRequest<UserDto>;

    public class SignUpCommandHandler : IRequestHandler<SignUpCommand, UserDto>
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IJwtExtension _jwtExtension;
        private readonly DbContext _dbContext;

        public SignUpCommandHandler(
            UserManager<UserEntity> userManager,
            IJwtExtension jwtExtension,
            DbContext dbContext)
        {
            _userManager = userManager;
            _jwtExtension = jwtExtension;
            _dbContext = dbContext;
        }

        public async Task<UserDto> Handle(SignUpCommand command, CancellationToken cancellationToken)
        {
            var user = new UserEntity
            {
                UserName = command.Email,
                Email = command.Email,
                Reminder = command.Reminder
            };

            var result = await _userManager.CreateAsync(user, command.MasterPassword);

            if (result.Succeeded)
            {
                var userDto = await _dbContext.Users
                    .ProjectToType<UserDto>()
                    .FirstAsync(o => o.Email == user.UserName);

                var token = await _jwtExtension.GenerateTokenAsync(user);
                userDto.Token = token;

                return userDto;
            }

            return null;
        }
    }
}
