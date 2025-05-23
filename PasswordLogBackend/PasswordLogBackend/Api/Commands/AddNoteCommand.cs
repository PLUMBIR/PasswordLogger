using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.Note;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record AddNoteCommand : IRequest<Unit>
    {
        public string UserId { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string Text { get; init; }

        public AddNoteCommand(NoteModel noteModel)
        {
            UserId = noteModel.UserId;
            Name = noteModel.Name;
            Folder = noteModel.Folder;
            Text = noteModel.Text;
        }
    }

    public class AddNoteCommandHandler : IRequestHandler<AddNoteCommand, Unit>
    {
        private readonly DbContext _dbContext;

        public AddNoteCommandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(AddNoteCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

            if (user == null)
            {
                throw new NotFoundException($"Пользователь с {command.UserId} не найден.");
            }

            user.AddNoteItem(new NoteEntity(command.Name, command.Folder, command.Text));

            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }

        public class NotFoundException : Exception
        {
            public NotFoundException(string message) : base(message) { }
        }
    }
}
