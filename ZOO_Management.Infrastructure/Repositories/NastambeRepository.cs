using Microsoft.EntityFrameworkCore;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.Infrastructure.Repositories
{
    public class NastambeRepository : INastambeRepository
    {
        private readonly ZOO_infsusContext _ctx;

        public NastambeRepository(ZOO_infsusContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Nastamba>> GetNastambeAsync()
        {
             return await _ctx.Nastamba.ToListAsync();
        }

        public async Task<Nastamba> GetNastambaByIdAsync(int id)
        {
            return await _ctx.Nastamba.FindAsync(id);
        }

        public async Task<int> CreateNastambaAsync(Nastamba nastamba)
        {
            await _ctx.AddAsync(nastamba);
            await _ctx.SaveChangesAsync();

            return nastamba.IdNastamba;
        }

        public async Task<int> UpdateNastambaAsync(Nastamba nastamba)
        {
            _ctx.Nastamba.Update(nastamba);
            await _ctx.SaveChangesAsync();

            return nastamba.IdNastamba;
        }

        public async Task<int> DeleteNastambaAsync(int id)
        {
            Nastamba nastamba = await _ctx.Nastamba.FindAsync(id);
            _ctx.Nastamba.Remove(nastamba);
            await _ctx.SaveChangesAsync();

            return id;
        }

    }
}
