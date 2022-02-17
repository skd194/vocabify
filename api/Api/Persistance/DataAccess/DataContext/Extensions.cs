using Application.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Application;
using Application.AppContracts;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Persistence.DataAccess
{
    internal static class Extensions
    {
        internal static void RemovePluralizingTableNameConvention(this ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                var baseType = entity.ClrType.BaseType;
                if (baseType != null &&
                    baseType.IsGenericType &&
                    baseType.GetGenericTypeDefinition() == typeof(ValueObject<>))
                {
                    continue;
                }

                entity.SetTableName(entity.DisplayName());
            }
        }
        internal static void UpdateEntityBase(this IEnumerable<EntityEntry> entries, IServiceContext serviceContext)
        {
            foreach (var entity in entries.Where(entry =>
                entry.State == EntityState.Added ||
                entry.State == EntityState.Modified))
            {
                if (entity.Entity is IAppEntityBase entityBase && !(entity.Entity is IAnonymous))
                {
                    entityBase.UpdateBase(serviceContext.UserId, DateTime.UtcNow);
                }

                if (entity.Entity is IAccount accountEntity)
                {
                    accountEntity.UpdateAccount(-1);
                }
            }
        }

    }
}