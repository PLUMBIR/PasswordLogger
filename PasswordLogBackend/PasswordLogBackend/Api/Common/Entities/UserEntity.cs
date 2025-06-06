﻿using Microsoft.AspNetCore.Identity;
using PasswordLogBackend.Api.Common.Entities.Address;
using PasswordLogBackend.Api.Common.Entities.BankAccount;
using PasswordLogBackend.Api.Common.Entities.Note;
using PasswordLogBackend.Api.Common.Entities.Password;
using PasswordLogBackend.Api.Common.Entities.PaymentCard;

namespace PasswordLogBackend.Api.Common.Entities
{
    public class UserEntity : IdentityUser
    {
        public string? Reminder {  get; set; }

        public string? Avatar { get; set; }

        public ICollection<PasswordEntity> Passwords { get; private set; }

        public ICollection<NoteEntity> Notes { get; set; }

        public ICollection<AddressEntity> Addresses { get; set; }

        public ICollection<PaymentCardEntity> CreditCards { get; set; }

        public ICollection<BankAccountEntity> BankAccounts { get; set; }

        public UserEntity()
        {
            Passwords = new List<PasswordEntity>();
            Notes = new List<NoteEntity>();
            Addresses = new List<AddressEntity>();
            CreditCards = new List<PaymentCardEntity>();
            BankAccounts = new List<BankAccountEntity>();
        }

        public void AddPasswordItem(PasswordEntity password)
        {
            Passwords.Add(password);
        }

        public void AddNoteItem(NoteEntity note)
        {
            Notes.Add(note);
        }

        public void AddAddressItem(AddressEntity address)
        {
            Addresses.Add(address);
        }

        public void AddCreditCardItem(PaymentCardEntity card)
        {
            CreditCards.Add(card);
        }

        public void AddBankAccountItem(BankAccountEntity bank)
        {
            BankAccounts.Add(bank);
        }

        public void DeletePasswordItem(PasswordEntity password)
        {
            Passwords.Remove(password);
        }

        public void DeleteNoteItem(NoteEntity note)
        {
            Notes.Remove(note);
        }

        public void DeleteAddressItem(AddressEntity address)
        {
            Addresses.Remove(address);
        }

        public void DeleteCreditCardItem(PaymentCardEntity card)
        {
            CreditCards.Remove(card);
        }

        public void DeleteBankAccountItem(BankAccountEntity bank)
        {
            BankAccounts.Remove(bank);
        }
    }
}
