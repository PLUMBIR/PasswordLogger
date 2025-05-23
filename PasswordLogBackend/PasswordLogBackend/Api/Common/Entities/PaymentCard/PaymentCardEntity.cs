namespace PasswordLogBackend.Api.Common.Entities.PaymentCard
{
    public class PaymentCardEntity : BaseEntity
    {
        public string Name { get; set; }

        public string Folder { get; set; }

        public string NameOnCard { get; set; }

        public long Number { get; set; }

        public int SecurityCode { get; set; }

        public string StartDate { get; set; }

        public string ExpirationDate { get; set; }

        public string Notes { get; set; }
    }
}
