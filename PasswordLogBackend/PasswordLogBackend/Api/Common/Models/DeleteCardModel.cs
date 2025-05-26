namespace PasswordLogBackend.Api.Common.Models
{
    public record DeleteCardModel
    {
        public string UserId { get; init; }

        public string CardId { get; init; }

        public string CardType { get; init; }
    }
}
