using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllAddressesQuery : IRequest<List<AddressDto>>
    {
        public string UserId { get; set; }

        public GetAllAddressesQuery(string id)
        {
            UserId = id;
        }
    }

    public class GetAllAddressesQueryHandler : IRequestHandler<GetAllAddressesQuery, List<AddressDto>>
    {
        private readonly DbContext _dbContext;

        public GetAllAddressesQueryHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<AddressDto>> Handle(GetAllAddressesQuery query, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(query.UserId))
            {
                return new List<AddressDto>();
            }

            return await _dbContext.Users
                .Include(u => u.Addresses)
                .Where(o => o.Id == query.UserId)
                .SelectMany(o => o.Addresses)
                .ProjectToType<AddressDto>()
                .ToListAsync();
        }
    }
}
