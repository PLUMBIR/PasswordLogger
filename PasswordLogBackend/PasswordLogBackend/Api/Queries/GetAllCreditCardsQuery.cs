using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllCreditCardsQuery : IRequest<List<CreditCardDto>>
    {
        public string UserId { get; set; }

        public GetAllCreditCardsQuery(string id)
        {
            UserId = id;
        }
    }

    public class GetAllCreditCardsQueryHandler : IRequestHandler<GetAllCreditCardsQuery, List<CreditCardDto>>
    {
        private readonly DbContext _dbContext;

        public GetAllCreditCardsQueryHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CreditCardDto>> Handle(GetAllCreditCardsQuery query, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(query.UserId))
            {
                return new List<CreditCardDto>();
            }

            return await _dbContext.Users
                .Include(u => u.CreditCards)
                .Where(o => o.Id == query.UserId)
                .SelectMany(o => o.CreditCards)
                .ProjectToType<CreditCardDto>()
                .ToListAsync();
        }
    }
}
