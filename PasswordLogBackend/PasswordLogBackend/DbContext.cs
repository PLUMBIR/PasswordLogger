using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PasswordLogBackend.Api.Common.Entities;
using PasswordLogBackend.Api.Common.Entities.Address;
using PasswordLogBackend.Api.Common.Entities.BankAccount;
using PasswordLogBackend.Api.Common.Entities.Note;
using PasswordLogBackend.Api.Common.Entities.Password;
using PasswordLogBackend.Api.Common.Entities.PaymentCard;

namespace PasswordLogBackend
{
    public class DbContext : IdentityDbContext<UserEntity>
    {
        public DbSet<PasswordEntity> Passwords { get; set; }

        public DbSet<NoteEntity> Notes { get; set; }

        public DbSet<AddressEntity> Addresses { get; set; }

        public DbSet<PaymentCardEntity> CreditCards { get; set; }

        public DbSet<BankAccountEntity> BankAccounts { get; set; }

        public DbContext(DbContextOptions<DbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
