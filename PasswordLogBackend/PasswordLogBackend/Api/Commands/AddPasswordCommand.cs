using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.Password;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record AddPasswordCommand : IRequest<Unit>
    {
        public string UserId { get; init; }

        public string Url { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string Username { get; init; }

        public string Password { get; init; }

        public string Notes { get; init; }

        public AddPasswordCommand(PasswordModel passwordModel)
        {
            UserId = passwordModel.UserId;
            Url = passwordModel.Url;
            Name = passwordModel.Name;
            Folder = passwordModel.Folder;
            Username = passwordModel.Username;
            Password = passwordModel.Password;
            Notes = passwordModel.Notes;
        }
    }

    public class AddPasswordCommandHandler : IRequestHandler<AddPasswordCommand, Unit>
    {
        private readonly DbContext _dbContext;

        public AddPasswordCommandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(AddPasswordCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

            if (user == null)
            {
                   throw new NotFoundException($"Пользователь с {command.UserId} не найден.");         
            }

            user.AddPasswordItem(new PasswordEntity(command.Url, command.Name, command.Folder, command.Username, command.Password) { Notes = command.Notes});

            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }

        public class NotFoundException : Exception
        {
            public NotFoundException(string message) : base(message) { }
        }
    }
}
