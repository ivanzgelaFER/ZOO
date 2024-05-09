using Microsoft.EntityFrameworkCore;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.Infrastructure.Repositories
{
    public class SektoriRepository : ISektoriRepository
    {
        private readonly ZOO_infsusContext _ctx;

        public SektoriRepository(ZOO_infsusContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Sektor>> GetSektoriAsync()
        {
            return await _ctx.Sektor.ToListAsync();
        }
    }
}
