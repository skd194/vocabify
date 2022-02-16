using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.DataAccessContract
{
    public interface IRepository<TEntity>
    {
        Task<TEntity> SingleAsync();

        void Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        void Remove(TEntity entity);

        void RemoveRange(IEnumerable<TEntity> entities);
    }
}