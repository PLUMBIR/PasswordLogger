using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllPasswordsQuery : IRequest<List<PasswordDto>>
    {
        public string UserId { get; set; }

        public GetAllPasswordsQuery(string id) 
        {
            UserId = id;
        }
    }

    public class GetAllPasswordsQueryHandler : IRequestHandler<GetAllPasswordsQuery, List<PasswordDto>>
    {
        private readonly DbContext _dbContext;

        public GetAllPasswordsQueryHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PasswordDto>> Handle(GetAllPasswordsQuery query, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(query.UserId)) 
            {
                return new List<PasswordDto>();
            }

            return await _dbContext.Users
                .Include(u => u.Passwords)
                .Where(o => o.Id == query.UserId)
                .SelectMany(o => o.Passwords)
                .ProjectToType<PasswordDto>()
                .ToListAsync();
        }
    }
}
