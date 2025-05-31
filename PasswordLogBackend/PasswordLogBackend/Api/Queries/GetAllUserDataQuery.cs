using MediatR;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllUserDataQuery : IRequest<UserFullDataDto>
    {
        public string UserId { get; }

        public GetAllUserDataQuery(string userId)
        {
            UserId = userId;
        }
    }

    public class GetAllUserDataHandler : IRequestHandler<GetAllUserDataQuery, UserFullDataDto>
    {
        private readonly IMediator _mediator;

        public GetAllUserDataHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task<UserFullDataDto> Handle(GetAllUserDataQuery request, CancellationToken cancellationToken)
        {
            var passwords = await _mediator.Send(new GetAllPasswordsQuery(request.UserId));
            var notes = await _mediator.Send(new GetAllNotesQuery(request.UserId));
            var addresses = await _mediator.Send(new GetAllAddressesQuery(request.UserId));
            var creditCards = await _mediator.Send(new GetAllCreditCardsQuery(request.UserId));
            var bankAccounts = await _mediator.Send(new GetAllBankAccountsQuery(request.UserId));

            return new UserFullDataDto
            {
                Passwords = passwords,
                Notes = notes,
                Addresses = addresses,
                CreditCards = creditCards,
                BankAccounts = bankAccounts
            };
        }
    }
}
