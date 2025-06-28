using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using PasswordLogBackend.Api.Commands;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Extensions;
using PasswordLogBackend.Api.Common.Models;
using PasswordLogBackend.Api.Queries;
using System.Net.Mail;
using System.Net;
using System;
using Microsoft.EntityFrameworkCore;

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

            app.MapPost("user/passwordgenerator", (PasswordGeneratorModel command) =>
            {
                var password = PasswordGeneratorExtension.GeneratePassword(command);
                return Results.Ok(password);
            });

            app.MapPost("user/updateCard", async (IMediator mediator, UpdateCardModel command) =>
            {
                var response = await mediator.Send(new UpdateCardCommand(command));
                return response;
            });

            app.MapPost("user/change-password", async (IMediator mediator, ChangePasswordModel request) =>
            {
                var command = new ChangePasswordCommand(request);
                var success = await mediator.Send(command);

                if (success)
                    return Results.Ok(new { message = "Пароль успешно изменен" });
                else
                    return Results.BadRequest(new { message = "Не удалось изменить пароль" });
            });

            app.MapPost("user/update-avatar", async (IMediator mediator, UpdateUserAvatarModel request) =>
            {
                var command = new UpdateUserAvatarCommand(request);
                var userDto = await mediator.Send(command);

                if (userDto != null)
                    return Results.Ok(userDto);
                else
                    return Results.BadRequest(new { message = "Не удалось обновить фотку" });
            });

            app.MapPost("user/send-reset-code", async (EmailModel request, DbContext db) =>
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user is null)
                    return Results.BadRequest("Email не найден.");

                var code = await EmailSenderExtension.SendResetCodeAsync(request.Email);
                return Results.Ok(code);
            });

            app.MapPost("user/send-user-message", async (EmailModel request) =>
            {
                await EmailSenderExtension.SendUserMessageAsync(request);
                return Results.Ok("Сообщение отправлено.");
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
