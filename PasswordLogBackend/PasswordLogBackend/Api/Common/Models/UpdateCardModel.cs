namespace PasswordLogBackend.Api.Common.Models
{
    public class UpdateCardModel
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public string? Url { get; set; }
        public string Name { get; set; }
        public string? Folder { get; set; }
        public string? Username { get; set; }
        public string? SitePassword { get; set; }
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? CityOrTown { get; set; }
        public string? MobilePhone { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? SWIFTCode { get; set; }
        public string? IBANNumber { get; set; }
        public int PIN { get; set; }
        public string? BranchPhone { get; set; }
        public string? NameOnCard { get; set; }
        public long Number { get; set; }
        public int SecurityCode { get; set; }
        public string? StartDate { get; set; }
        public string? ExpirationDate { get; set; }
        public string? Text { get; set; }
        public string? Notes { get; set; }
    }
}
