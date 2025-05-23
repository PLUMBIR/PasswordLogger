using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PasswordLogBackend.Api.Common.Entities
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasMany(o => o.Passwords)
                .WithOne()
                .HasForeignKey("UserId");

            builder.HasMany(o => o.Notes)
                .WithOne()
                .HasForeignKey("UserId");

            builder.HasMany(o => o.Addresses)
                .WithOne()
                .HasForeignKey("UserId");

            builder.HasMany(o => o.CreditCards)
                .WithOne()
                .HasForeignKey("UserId");

            builder.HasMany(o => o.BankAccounts)
                .WithOne()
                .HasForeignKey("UserId");
        }
    }
}
