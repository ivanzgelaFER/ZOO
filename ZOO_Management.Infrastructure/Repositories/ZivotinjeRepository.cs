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

        public async Task<int> UpdateZivotinjaAsync(Zivotinja zivotinja)
        {
            _ctx.Zivotinja.Update(zivotinja);
            await _ctx.SaveChangesAsync();
            return zivotinja.IdZivotinja;
        }

        public async Task<int> DeleteZivotinjaAsync(int id)
        {
            Zivotinja zivotinja = await _ctx.Zivotinja.FindAsync(id);
            _ctx.Zivotinja.Remove(zivotinja);
            await _ctx.SaveChangesAsync();
            return id;
        }
        
        public async Task<List<Zivotinja>> GetZivotinjeAsync()
        {
            return await _ctx.Zivotinja.ToListAsync();
        }
        
        public async Task<Zivotinja> GetZivotinjaByIdAsync(int id)
        {
            return await _ctx.Zivotinja.FindAsync(id);
        }

        public async Task<int> CreateZivotinjaAsync(Zivotinja novaZivotinja)
        {
            await _ctx.Zivotinja.AddAsync(novaZivotinja);
            await _ctx.SaveChangesAsync();
            return novaZivotinja.IdZivotinja;
        }
    }
}
