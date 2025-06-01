using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public class UpdateCardCommand : IRequest<IResult>
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public string? Url { get; set; }
        public string Name { get; set; }
        public string? Folder { get; set; }
        public string? Username { get; set; }
        public string? SitePassword { get; set; }
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? CityOrTown { get; set; }
        public string? MobilePhone { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? SWIFTCode { get; set; }
        public string? IBANNumber { get; set; }
        public int PIN { get; set; }
        public string? BranchPhone { get; set; }
        public string? NameOnCard { get; set; }
        public long Number { get; set; }
        public int SecurityCode { get; set; }
        public string? StartDate { get; set; }
        public string? ExpirationDate { get; set; }
        public string? Text { get; set; }
        public string? Notes { get; set; }

        public UpdateCardCommand(UpdateCardModel cardModel)
        {
            Id = cardModel.Id;
            Type = cardModel.Type;
            UserId = cardModel.UserId;
            Url = cardModel.Url;
            Name = cardModel.Name;
            Folder = cardModel.Folder;
            Username = cardModel.Username;
            SitePassword = cardModel.SitePassword;
            Title = cardModel.Title;
            FirstName = cardModel.FirstName;
            MiddleName = cardModel.MiddleName;
            LastName = cardModel.LastName;
            Address1 = cardModel.Address1;
            Address2 = cardModel.Address2;
            Address3 = cardModel.Address3;
            CityOrTown = cardModel.CityOrTown;
            MobilePhone = cardModel.MobilePhone;
            BankName = cardModel.BankName;
            AccountNumber = cardModel.AccountNumber;
            SWIFTCode = cardModel.SWIFTCode;
            IBANNumber = cardModel.IBANNumber;
            PIN = cardModel.PIN;
            BranchPhone = cardModel.BranchPhone;
            NameOnCard = cardModel.NameOnCard;
            Number = cardModel.Number;
            SecurityCode = cardModel.SecurityCode;
            StartDate = cardModel.StartDate;
            ExpirationDate = cardModel.ExpirationDate;
            Text = cardModel.Text;
            Notes = cardModel.Notes;
        }
    }


    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand, IResult>
    {
        private readonly DbContext _dbContext;

        public UpdateCardCommandHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IResult> Handle(UpdateCardCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .Include(u => u.Passwords)
                .Include(u => u.Notes)
                .Include(u => u.Addresses)
                .Include(u => u.CreditCards)
                .Include(u => u.BankAccounts)
                .FirstOrDefaultAsync(u => u.Id == command.UserId);

            if (user == null)
            {
                return Results.NotFound();
            }

            switch (command.Type.ToLower())
            {
                case "password":
                    var passwordItem =  user.Passwords.FirstOrDefault(p => p.Id.ToString() == command.Id.ToLower());

                    passwordItem.Url = command.Url;
                    passwordItem.Name = command.Name;
                    passwordItem.Folder = command.Folder;
                    passwordItem.Username = command.Username;
                    passwordItem.SitePassword = PasswordEncryptExtension.Encrypt(command.SitePassword);
                    passwordItem.Notes = command.Notes;
                    break;

                case "note":
                    var noteItem = user.Notes.FirstOrDefault(n => n.Id.ToString() == command.Id.ToLower());

                    noteItem.Name = command.Name;
                    noteItem.Folder = command.Folder;
                    noteItem.Text = command.Text;
                    break;

                case "address":
                    var addressItem = user.Addresses.FirstOrDefault(a => a.Id.ToString() == command.Id.ToLower());

                    addressItem.Name = command.Name;
                    addressItem.Folder = command.Folder;
                    addressItem.Title = command.Title;
                    addressItem.FirstName = command.FirstName;
                    addressItem.MiddleName = command.MiddleName;
                    addressItem.LastName = command.LastName;
                    addressItem.Address1 = command.Address1;
                    addressItem.Address2 = command.Address2;
                    addressItem.Address3 = command.Address3;
                    addressItem.CityOrTown = command.CityOrTown;
                    addressItem.MobilePhone = command.MobilePhone;
                    addressItem.Notes = command.Notes;
                    break;

                case "creditcard":
                    var creditCardItem = user.CreditCards.FirstOrDefault(c => c.Id.ToString() == command.Id.ToLower());

                    creditCardItem.Name = command.Name;
                    creditCardItem.Folder = command.Folder;
                    creditCardItem.NameOnCard = command.NameOnCard;
                    creditCardItem.Number = command.Number;
                    creditCardItem.SecurityCode = command.SecurityCode;
                    creditCardItem.StartDate = command.StartDate;
                    creditCardItem.ExpirationDate = command.ExpirationDate;
                    creditCardItem.Notes = command.Notes;
                    break;

                case "bankaccount":
                    var bankAccountItem = user.BankAccounts.FirstOrDefault(b => b.Id.ToString() == command.Id.ToLower());

                    bankAccountItem.Name = command.Name;
                    bankAccountItem.Folder = command.Folder;
                    bankAccountItem.BankName = command.BankName;
                    bankAccountItem.AccountNumber = command.AccountNumber;
                    bankAccountItem.SWIFTCode = command.SWIFTCode;
                    bankAccountItem.IBANNumber = command.IBANNumber;
                    bankAccountItem.PIN = command.PIN;
                    bankAccountItem.BranchPhone = command.BranchPhone;
                    bankAccountItem.Notes = command.Notes;
                    break;
            }

            await _dbContext.SaveChangesAsync();

            return Results.Ok();
        }
    }
}
