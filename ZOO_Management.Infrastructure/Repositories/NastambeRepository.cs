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
    }
}
