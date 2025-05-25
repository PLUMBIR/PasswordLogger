using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Models.Dtos;

namespace PasswordLogBackend.Api.Queries
{
    public class GetAllNotesQuery : IRequest<List<NoteDto>>
    {
        public string UserId { get; set; }

        public GetAllNotesQuery(string id)
        {
            UserId = id;
        }
    }

    public class GetAllNotesQueryHandler : IRequestHandler<GetAllNotesQuery, List<NoteDto>>
    {
        private readonly DbContext _dbContext;

        public GetAllNotesQueryHandler(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<NoteDto>> Handle(GetAllNotesQuery query, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(query.UserId))
            {
                return new List<NoteDto>();
            }

            return await _dbContext.Users
                .Include(u => u.Notes)
                .Where(o => o.Id == query.UserId)
                .SelectMany(o => o.Notes)
                .ProjectToType<NoteDto>()
                .ToListAsync();
        }
    }
}
