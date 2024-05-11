using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Crmf;
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

        public async Task<Sektor> GetSektorByIdAsync(int id)
        {
            return await _ctx.Sektor.FindAsync(id);
        }

        public async Task<int> CreateSektorAsync(Sektor sektor)
        {
            await _ctx.AddAsync(sektor);
            await _ctx.SaveChangesAsync();

            return sektor.IdSektor;
        }

        public async Task<int> UpdateSektorAsync(Sektor sektor)
        {
            _ctx.Sektor.Update(sektor);
            await _ctx.SaveChangesAsync();

            return sektor.IdSektor;
        }

        public async Task<int> DeleteSektorAsync(int id)
        {
            Sektor sektor = await _ctx.Sektor.FindAsync(id);
            _ctx.Sektor.Remove(sektor);
            await _ctx.SaveChangesAsync();

            return id;
        }
    }
}
