using MediatR;
using PasswordLogBackend.Api.Commands;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            app.MapPost("/addpassword", async (IMediator mediator, PasswordModel command) =>
            {
                var response = await mediator.Send(new AddPasswordCommand(command));
                return response;
            });

            app.MapPost("/addnote", async (IMediator mediator, NoteModel command) =>
            {
                var response = await mediator.Send(new AddNoteCommand(command));
                return response;
            });

            app.MapPost("/addaddress", async (IMediator mediator, AddressModel command) =>
            {
                var response = await mediator.Send(new AddAddressCommand(command));
                return response;
            });
        }
    }
}
