using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllBankAccountsQuery : IRequest<List<BankAccountDto>>
    {
        public string UserId { get; set; }

        public GetAllBankAccountsQuery(string id)
        {
            UserId = id;
        }
    }

    public class GetAllBankAccountsQueryHandler : IRequestHandler<GetAllBankAccountsQuery, List<BankAccountDto>>
    {
        private readonly DbContext _dbContext;

        public GetAllBankAccountsQueryHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<BankAccountDto>> Handle(GetAllBankAccountsQuery query, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(query.UserId))
            {
                return new List<BankAccountDto>();
            }

            return await _dbContext.Users
                .Include(u => u.BankAccounts)
                .Where(o => o.Id == query.UserId)
                .SelectMany(o => o.BankAccounts)
                .ProjectToType<BankAccountDto>()
                .ToListAsync();
        }
    }
}
