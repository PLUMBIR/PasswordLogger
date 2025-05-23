using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Interfaces;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record SignInCommand(string Email, string MasterPassword) : IRequest<UserDto>;

    public class SignInCommandHandler : IRequestHandler<SignInCommand, UserDto> 
    {
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly IJwtExtension _jwtExtension;
        private readonly DbContext _dbContext;

        public SignInCommandHandler(
            SignInManager<UserEntity> signInManager,
            IJwtExtension jwtExtension,
            DbContext dbContext,
            UserManager<UserEntity> userManager)
        {
            _signInManager = signInManager;
            _jwtExtension = jwtExtension;
            _dbContext = dbContext;
        }

        public async Task<UserDto> Handle(SignInCommand command, CancellationToken cancellationToken)
        {
            var result = await _signInManager.PasswordSignInAsync(command.Email, command.MasterPassword, false, true);

            if (result.Succeeded)
            {
                var user = await _dbContext.Users.FirstAsync(o => o.UserName == command.Email);

                var token = await _jwtExtension.GenerateTokenAsync(user);

                var userDto = await _dbContext.Users
                    .ProjectToType<UserDto>()
                    .FirstAsync(o => o.Email == user.UserName);


                userDto.Token = token;

                return userDto;
            }

            return null;
        }
    }
}
