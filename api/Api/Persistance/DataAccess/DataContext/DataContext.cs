using Application.AppContracts;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Domain;

namespace Persistence.DataAccess
{
    public sealed class DataContext: DbContext
    {
        private readonly IServiceContext _serviceContext;

        public DataContext(
            DbContextOptions<DataContext> options,
            IServiceContext serviceContext)
            : base(options)
        {
            ChangeTracker.LazyLoadingEnabled = false;
            _serviceContext = serviceContext;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.RemovePluralizingTableNameConvention();
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await using var txn = await Database.BeginTransactionAsync(cancellationToken);
            ChangeTracker.Entries().UpdateEntityBase(_serviceContext);
            var result = await base.SaveChangesAsync(cancellationToken);
            await txn.CommitAsync(cancellationToken);
            return result;
        }

        public override int SaveChanges()
        {
            var txn = Database.BeginTransaction();
            ChangeTracker.Entries().UpdateEntityBase(_serviceContext);
            var result = base.SaveChanges();
            txn.CommitAsync();
            return result;
        }
    }
}
