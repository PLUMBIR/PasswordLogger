namespace PasswordLogBackend.Api.Common.Models.Dtos
{
    public class UserFullDataDto
    {
        public List<PasswordDto> Passwords { get; set; }
        public List<NoteDto> Notes { get; set; }
        public List<AddressDto> Addresses { get; set; }
        public List<CreditCardDto> CreditCards { get; set; }
        public List<BankAccountDto> BankAccounts { get; set; }
    }
}
