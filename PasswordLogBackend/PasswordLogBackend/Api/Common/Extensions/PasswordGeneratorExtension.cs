using PasswordLogBackend.Api.Common.Models;
using System.Text;

namespace PasswordLogBackend.Api.Common.Extensions
{
    public class PasswordGeneratorExtension
    {
        private const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
        private const string Numbers = "0123456789";
        private const string Symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

        public static string GeneratePassword(PasswordGeneratorModel request)
        {
            var charPool = new StringBuilder();

            if (request.IncludeUppercase) charPool.Append(UppercaseLetters);
            if (request.IncludeLowercase) charPool.Append(LowercaseLetters);
            if (request.IncludeNumbers) charPool.Append(Numbers);
            if (request.IncludeSymbols) charPool.Append(Symbols);

            return GenerateRandomPassword(request.Length, charPool.ToString());
        }

        private static string GenerateRandomPassword(int length, string charPool)
        {
            var random = new Random();
            return new string(Enumerable.Range(0, length)
                .Select(_ => charPool[random.Next(charPool.Length)])
                .ToArray());
        }
    }
}
