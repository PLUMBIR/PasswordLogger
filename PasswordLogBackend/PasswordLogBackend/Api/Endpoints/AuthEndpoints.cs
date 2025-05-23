using MediatR;
using PasswordLogBackend.Api.Commands;

namespace PasswordLogBackend.Api.Endpoints
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this WebApplication app)
        {
            
            app.MapPost("/signup", async (IMediator mediator, SignUpCommand command) =>
            {
                var response = await mediator.Send(command);

                if (response is not null)
                {
                    return Results.Ok(response);
                }

                return Results.BadRequest();
            });

            app.MapPost("/signin", async (IMediator mediator, SignInCommand command) =>
            {
                var response = await mediator.Send(command);

                if (response is not null)
                {
                    return Results.Ok(response);
                }

                return Results.BadRequest();
            });
        }
    }
}
