using Microsoft.EntityFrameworkCore;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.Infrastructure.Repositories
{
    public class ZivotinjeRepository : IZivotinjeRepository
    {
        private readonly ZOO_infsusContext _ctx;

        public ZivotinjeRepository(ZOO_infsusContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Zivotinja>> GetByNastambaIdAsync(int nastambaId)
        {
            return await _ctx.Zivotinja.Where(z => z.IdNastamba == nastambaId).ToListAsync();
        }
    }
}
