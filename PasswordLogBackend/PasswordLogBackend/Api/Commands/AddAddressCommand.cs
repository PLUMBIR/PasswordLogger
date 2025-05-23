using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities.Address;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Commands
{
    public record class AddAddressCommand : IRequest<Unit>
    {
        public string UserId { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string Title { get; init; }

        public string FirstName { get; init; }

        public string MiddleName { get; init; }

        public string LastName { get; init; }

        public string Address1 { get; init; }

        public string Address2 { get; init; }

        public string Address3 { get; init; }

        public string CityOrTown { get; init; }

        public string Country { get; init; }

        public string MobilePhone { get; init; }

        public string Notes { get; init; }

        public AddAddressCommand(AddressModel addressModel)
        {
            UserId = addressModel.UserId;
            Name = addressModel.Name;
            Folder = addressModel.Folder;
            Title = addressModel.Title;
            FirstName = addressModel.FirstName;
            MiddleName = addressModel.MiddleName;
            LastName = addressModel.LastName;
            Address1 = addressModel.Address1;
            Address2 = addressModel.Address2;
            Address3 = addressModel.Address3;
            CityOrTown = addressModel.CityOrTown;
            Country = addressModel.Country;
            MobilePhone = addressModel.MobilePhone;
            Notes = addressModel.Notes;
        }

        public class AddAddressCommandHandler : IRequestHandler<AddAddressCommand, Unit>
        {
            private readonly DbContext _dbContext;

            public AddAddressCommandHandler(DbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Unit> Handle(AddAddressCommand command, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(o => o.Id == command.UserId);

                if (user == null)
                {
                    throw new NotFoundException($"Пользователь с {command.UserId} не найден.");
                }

                user.AddAddressItem(new AddressEntity(
                    command.Name,
                    command.Folder,
                    command.Title,
                    command.FirstName,
                    command.MiddleName,
                    command.LastName,
                    command.Address1,
                    command.Address2,
                    command.Address3,
                    command.CityOrTown,
                    command.MobilePhone,
                    command.Notes
                    ));

                await _dbContext.SaveChangesAsync();

                return Unit.Value;
            }

            public class NotFoundException : Exception
            {
                public NotFoundException(string message) : base(message) { }
            }
        }
    }
}
