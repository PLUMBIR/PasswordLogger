using MediatR;
using PasswordLogBackend.Api.Commands;
using PasswordLogBackend.Api.Common.Extensions;
using PasswordLogBackend.Api.Common.Models;
using PasswordLogBackend.Api.Queries;

namespace PasswordLogBackend.Api.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            app.MapPost("user/passwords", async (IMediator mediator, PasswordModel command) =>
            {
                var response = await mediator.Send(new AddPasswordCommand(command));
                return response;
            });

            app.MapPost("user/notes", async (IMediator mediator, NoteModel command) =>
            {
                var response = await mediator.Send(new AddNoteCommand(command));
                return response;
            });

            app.MapPost("user/addresses", async (IMediator mediator, AddressModel command) =>
            {
                var response = await mediator.Send(new AddAddressCommand(command));
                return response;
            });

            app.MapPost("user/creditCard", async (IMediator mediator, CreditCardModel command) =>
            {
                var response = await mediator.Send(new AddCreditCardCommand(command));
                return response;
            });

            app.MapPost("user/bankAccount", async (IMediator mediator, BankAccountModel command) =>
            {
                var response = await mediator.Send(new AddBankAccountCommand(command));
                return response;
            });

            app.MapPost("user/passwordgenerator", (PasswordGeneratorModel model) =>
            {
                var password = PasswordGeneratorExtension.GeneratePassword(model);
                return Results.Ok(password);
            });


            app.MapGet("user/passwords/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllPasswordsQuery(userId));
            });

            app.MapGet("user/notes/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllNotesQuery(userId));
            });

            app.MapGet("user/addresses/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllAddressesQuery(userId));
            });

            app.MapGet("user/creditCards/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllCreditCardsQuery(userId));
            });

            app.MapGet("user/bankAccounts/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllBankAccountsQuery(userId));
            });

            app.MapGet("user/fulldata/{userId}", async (IMediator mediator, string userId) =>
            {
                return await mediator.Send(new GetAllUserDataQuery(userId));
            });

            app.MapDelete("user/card", async (HttpContext context, IMediator mediator) =>
            {
                var command = await context.Request.ReadFromJsonAsync<DeleteCardModel>();

                return await mediator.Send(new DeleteCardByIdComand(command.UserId, command.CardId, command.CardType));
            });

        }
    }
}
