namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public record BankAccountDto
    {
        public string Id { get; init; }

        public string Name { get; init; }

        public string Folder { get; init; }

        public string BankName { get; init; }

        public string AccountNumber { get; init; }

        public string SWIFTCode { get; init; }

        public string IBANNumber { get; init; }

        public int PIN { get; init; }

        public string BranchPhone { get; init; }

        public string Notes { get; init; }
    }
}
