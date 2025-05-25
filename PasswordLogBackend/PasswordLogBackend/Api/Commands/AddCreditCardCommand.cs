using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.PaymentCard;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record AddCreditCardCommand : IRequest<IResult>
    {
        public string UserId { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string NameOnCard { get; init; }

        public long Number { get; init; }

        public int SecurityCode { get; init; }

        public string StartDate { get; init; }

        public string ExpirationDate { get; init; }

        public string Notes { get; init; }

        public AddCreditCardCommand(CreditCardModel creditCard) 
        {
            UserId = creditCard.UserId;
            Name = creditCard.Name;
            Folder = creditCard.Folder;
            NameOnCard = creditCard.NameOnCard;
            Number = creditCard.Number;
            SecurityCode = creditCard.SecurityCode;
            StartDate = creditCard.StartDate;
            ExpirationDate = creditCard.ExpirationDate;
            Notes = creditCard.Notes;
        }
    }

    public class AddCreditCardCommandHandler : IRequestHandler<AddCreditCardCommand, IResult>
    {
        private readonly DbContext _dbContext;

        public AddCreditCardCommandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IResult> Handle(AddCreditCardCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

            if (user == null)
            {
                return Results.NotFound($"Пользователь с {command.UserId} не найден.");
            }

            user.AddCreditCardItem(new PaymentCardEntity(
                command.Name, 
                command.Folder, 
                command.NameOnCard, 
                command.Number, 
                command.SecurityCode, 
                command.StartDate, 
                command.ExpirationDate
                ) 
            { Notes = command.Notes });

            await _dbContext.SaveChangesAsync();

            return Results.Ok();
        }
    }
}
