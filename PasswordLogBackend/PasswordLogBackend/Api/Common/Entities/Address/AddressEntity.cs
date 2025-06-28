namespace PasswordLogBackend.Api.Common.Entities.Address
{
    public class AddressEntity : BaseEntity
    {
        public string Name { get; set; }

        public string Folder { get; set; }

        public string Title { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string CityOrTown { get; set; }

        public string MobilePhone { get; set; }

        public string Notes { get; set; }

        protected AddressEntity()
        {
        }

        public AddressEntity(
            string name, 
            string title, 
            string firstName, 
            string middleName, 
            string lastName, 
            string address1, 
            string address2, 
            string address3, 
            string cityOrTown,  
            string mobilePhone)
        {
            Name = name;
            Title = title;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            Address1 = address1;
            Address2 = address2;
            Address3 = address3;
            CityOrTown = cityOrTown;
            MobilePhone = mobilePhone;
        }
    }
}
