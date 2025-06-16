using System.Net.Mail;
using System.Net;
using PasswordLogBackend.Api.Common.Models;

namespace PasswordLogBackend.Api.Common.Extensions
{
    public static class EmailSenderExtension
    {
        private static readonly string _smtpServer = "smtp.mail.ru";
        private static readonly int _port = 587;
        private static readonly string _emailFrom = "passwordloggerggkttid@mail.ru";
        private static readonly string _password = "SHYghKQjmAVUz8l3bBF1";

        public static async Task SendResetCodeAsync(string recipientEmail)
        {
            string code = new Random().Next(100000, 999999).ToString();
            string subject = "Сброс пароля";
            string body = $"Ваш код сброса пароля: {code}";

            await SendEmailAsync(recipientEmail, subject, body);
        }

        public static async Task SendUserMessageAsync(EmailModel request)
        {
            string subject = "Сообщение от пользователя";
            string recipientEmail = "passwordloggerggkttid@mail.ru";

            string body = $"Имя: {request.Name}\n" +
                          $"Email: {request.Email}\n" +
                          (string.IsNullOrWhiteSpace(request.Number) ? "" : $"Телефон: {request.Number}\n") +
                          $"Сообщение: {request.Offers}";

            await SendEmailAsync(recipientEmail, subject, body);
        }


        private static async Task SendEmailAsync(string recipientEmail, string subject, string body)
        {
            using (var client = new SmtpClient(_smtpServer))
            {
                client.Port = _port;
                client.Credentials = new NetworkCredential(_emailFrom, _password);
                client.EnableSsl = true;

                var mail = new MailMessage
                {
                    From = new MailAddress(_emailFrom),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                mail.To.Add(recipientEmail);

                await client.SendMailAsync(mail);
            }
        }
    }

}
