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
            var random = new Random();
            var requiredChars = new List<char>();
            var charPool = new StringBuilder();

            if (request.IncludeUppercase)
            {
                charPool.Append(UppercaseLetters);
                requiredChars.Add(UppercaseLetters[random.Next(UppercaseLetters.Length)]);
            }

            if (request.IncludeLowercase)
            {
                charPool.Append(LowercaseLetters);
                requiredChars.Add(LowercaseLetters[random.Next(LowercaseLetters.Length)]);
            }

            if (request.IncludeNumbers)
            {
                charPool.Append(Numbers);
                requiredChars.Add(Numbers[random.Next(Numbers.Length)]);
            }

            if (request.IncludeSymbols)
            {
                charPool.Append(Symbols);
                requiredChars.Add(Symbols[random.Next(Symbols.Length)]);
            }

            var allChars = charPool.ToString();
            var remainingLength = request.Length - requiredChars.Count;

            var passwordChars = new List<char>(requiredChars);

            for (int i = 0; i < remainingLength; i++)
            {
                passwordChars.Add(allChars[random.Next(allChars.Length)]);
            }

            return new string(passwordChars.OrderBy(_ => random.Next()).ToArray());
        }

    }
}
