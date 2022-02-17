using Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence
{
    internal class EntityTypeConfigurationArgs
    {
        internal bool SkipIdentityConfiguration { get; set; } = false;
        internal bool SkipRowVersionConfiguration { get; set; } = false;
    }

    internal abstract class BaseAppEntityConfiguration<TEntity>
        : IEntityTypeConfiguration<TEntity> where TEntity : AppEntity
    {
        private readonly EntityTypeConfigurationArgs _args;

        protected BaseAppEntityConfiguration()
        {
            _args = new EntityTypeConfigurationArgs();
        }

        protected BaseAppEntityConfiguration(
            EntityTypeConfigurationArgs args)
        {
            _args = args;
        }

        public void Configure(EntityTypeBuilder<TEntity> builder)
        {
            if (!_args.SkipIdentityConfiguration)
            {
                builder.HasKey(e => new {e.AccountId, e.Id});
                builder.Property(x => x.Id).ValueGeneratedOnAdd();
            }

            builder.Property(t => t.Id).IsRequired();

            ConfigureEntity(builder);

            if (!_args.SkipRowVersionConfiguration)
            {
                builder.Property(t => t.RowVersionStamp)
                    .ValueGeneratedOnAddOrUpdate()
                    .IsRowVersion()
                    .IsConcurrencyToken();
            }

            builder.Property(t => t.UpdatedOn).IsRequired();

            builder.Property(x => x.UpdatedBy).IsRequired();
        }
        public abstract void ConfigureEntity(EntityTypeBuilder<TEntity> builder);
    }
}
