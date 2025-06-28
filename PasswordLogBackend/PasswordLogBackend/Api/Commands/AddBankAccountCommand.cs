using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.BankAccount;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{

    public record AddBankAccountCommand : IRequest<IResult>
    {
        public string UserId { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string BankName { get; init; }

        public string AccountNumber { get; init; }

        public string SWIFTCode { get; init; }

        public string IBANNumber { get; init; }

        public int PIN { get; init; }

        public string BranchPhone { get; init; }

        public string Notes { get; init; }

        public AddBankAccountCommand(BankAccountModel bankAccount)
        {
            UserId = bankAccount.UserId;
            Name = bankAccount.Name;
            Folder = bankAccount.Folder;
            BankName = bankAccount.BankName;
            AccountNumber = bankAccount.AccountNumber;
            SWIFTCode = bankAccount.SWIFTCode;
            IBANNumber = bankAccount.IBANNumber;
            PIN = bankAccount.PIN;
            BranchPhone = bankAccount.BranchPhone;  
            Notes = bankAccount.Notes;
        }
    }

    public class AddBankAccountCommandHandler : IRequestHandler<AddBankAccountCommand, IResult>
    {
        private readonly DbContext _dbContext;

        public AddBankAccountCommandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IResult> Handle(AddBankAccountCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

            if (user == null)
            {
                return Results.NotFound($"Пользователь с {command.UserId} не найден.");
            }

            user.AddBankAccountItem(new BankAccountEntity(
                command.Name,
                command.BankName,
                command.AccountNumber,
                command.PIN,
                command.BranchPhone
                )
            {
                Folder = command.Folder,
                SWIFTCode = command.SWIFTCode,
                IBANNumber= command.IBANNumber,
                Notes = command.Notes
            });

            await _dbContext.SaveChangesAsync();

            return Results.Ok();
        }
    }
}
