namespace PasswordLogBackend.Api.Common.Entities.BankAccount
{
    public class BankAccountEntity : BaseEntity
    {
        public string Name { get; set; }

        public string Folder { get; set; }

        public string BankName { get; set; }

        public string AccountNumber { get; set; }

        public string SWIFTCode { get; set; }

        public string IBANNumber { get; set; }

        public int PIN { get; set; }

        public string BranchPhone { get; set; }

        public string Notes { get; set; }

        protected BankAccountEntity()
        {
        }

        public BankAccountEntity(string name, string bankName, string accountNumber, int pin, string branchPhone)
        {
            Name = name;
            BankName = bankName;
            AccountNumber = accountNumber;
            PIN = pin;
            BranchPhone = branchPhone;
        }
    }
}
