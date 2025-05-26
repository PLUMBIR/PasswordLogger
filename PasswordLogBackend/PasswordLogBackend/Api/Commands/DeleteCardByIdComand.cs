using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.Password;

namespace PasswordLogBackend.Api.Commands
{
    public record DeleteCardByIdComand : IRequest<IResult>
    {
        public string UserId { get; init; }

        public string CardId { get; init; }

        public string CardType { get; init; }

        public DeleteCardByIdComand(string userId, string cardId, string cardType) 
        {
            UserId = userId;
            CardId = cardId;
            CardType = cardType;
        }
    }

    public class DeleteCardByIdComandHandler : IRequestHandler<DeleteCardByIdComand, IResult>
    {
        private readonly DbContext _dbContext;

        public DeleteCardByIdComandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IResult> Handle(DeleteCardByIdComand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

            if (user == null)
            {
                return Results.BadRequest();
            }

            switch (command.CardType)
            {
                case "password":
                    var passwordEntity = await _dbContext.Passwords.FirstOrDefaultAsync(p => p.Id.ToString() == command.CardId);
                    if (passwordEntity == null) return Results.NotFound();
                    user.DeletePasswordItem(passwordEntity);
                    break;

                case "note":
                    var noteEntity = await _dbContext.Notes.FirstOrDefaultAsync(n => n.Id.ToString() == command.CardId);
                    if (noteEntity == null) return Results.NotFound();
                    user.DeleteNoteItem(noteEntity);
                    break;

                case "address":
                    var addressEntity = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id.ToString() == command.CardId);
                    if (addressEntity == null) return Results.NotFound();
                    user.DeleteAddressItem(addressEntity);
                    break;

                case "creditCard":
                    var creditCardEntity = await _dbContext.CreditCards.FirstOrDefaultAsync(c => c.Id.ToString() == command.CardId);
                    if (creditCardEntity == null) return Results.NotFound();
                    user.DeleteCreditCardItem(creditCardEntity);
                    break;

                case "bankAccount":
                    var bankAccountEntity = await _dbContext.BankAccounts.FirstOrDefaultAsync(b => b.Id.ToString() == command.CardId);
                    if (bankAccountEntity == null) return Results.NotFound();
                    user.DeleteBankAccountItem(bankAccountEntity);
                    break;

                default:
                    return Results.BadRequest();
            }

            await _dbContext.SaveChangesAsync();

            return Results.Ok();
        }

    }
}
