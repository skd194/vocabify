using System;
using Application.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence
{
    internal class UserConfiguration : BaseAppEntityConfiguration<User>
    {
        public override void ConfigureEntity(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Username).IsRequired().HasMaxLength(100);

            builder.HasAlternateKey(x => new {x.AccountId, x.Username})
                .HasName("AK_User_AccountId_Username");

            builder.Property(x => x.PasswordHash).IsRequired();

            builder.Property(x => x.PasswordSalt).IsRequired();
        }
    }

    public class UserConstraintHandler: DbConstrainHandler
    {
        protected override void ConfigureConstraintMessage(Action<DbConstraintMessage> add)
        {
            add(new DbConstraintMessage("AK_User_AccountId_Username", "Username already exists"));
        }
    }
}
