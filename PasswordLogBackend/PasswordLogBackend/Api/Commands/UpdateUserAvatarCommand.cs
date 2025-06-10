using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Interfaces;
using PasswordLogBackend.Api.Common.Models;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Commands
{
    public class UpdateUserAvatarCommand : IRequest<UserDto>
    {
        public UpdateUserAvatarModel Model { get; set; }

        public UpdateUserAvatarCommand(UpdateUserAvatarModel model)
        {
            Model = model;
        }
    }

    public class UpdateUserAvatarCommandHandler : IRequestHandler<UpdateUserAvatarCommand, UserDto>
    {
        private readonly DbContext _dbContext;
        private readonly IJwtExtension _jwtExtension;

        public UpdateUserAvatarCommandHandler(
            DbContext dbContext,
            IJwtExtension jwtExtension,
            UserManager<UserEntity> userManager)
        {
            _dbContext = dbContext;
            _jwtExtension = jwtExtension;
        }

        public async Task<UserDto> Handle(UpdateUserAvatarCommand request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstAsync(o => o.Id == request.Model.UserId, cancellationToken);

            user.Avatar = request.Model.Avatar;

            await _dbContext.SaveChangesAsync(cancellationToken);

            var token = await _jwtExtension.GenerateTokenAsync(user);

            var userDto = await _dbContext.Users
                    .ProjectToType<UserDto>()
                    .FirstAsync(o => o.Email == user.UserName);

            userDto.Token = token;

            return userDto;
        }
    }
}
