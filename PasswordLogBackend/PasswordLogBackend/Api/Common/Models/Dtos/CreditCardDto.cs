namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public record CreditCardDto
    {
        public string Id { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string NameOnCard { get; init; }

        public long Number { get; init; }

        public int SecurityCode { get; init; }

        public string StartDate { get; init; }

        public string ExpirationDate { get; init; }

        public string Notes { get; init; }
    }
}
