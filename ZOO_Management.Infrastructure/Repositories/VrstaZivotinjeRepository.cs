using Microsoft.EntityFrameworkCore;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.Infrastructure.Repositories;

public class VrstaZivotinjeRepository : IVrstaZivotinjeRepository
{
    private readonly ZOO_infsusContext _ctx;

    public VrstaZivotinjeRepository(ZOO_infsusContext ctx)
    {
        _ctx = ctx;
    }
    
    public async Task<List<VrstaZivotinje>> GetVrsteZivotinjaAsync()
    {  
        return await _ctx.VrstaZivotinje.ToListAsync();
    }

    public async Task<VrstaZivotinje> GetVrstaZivotinjaByIdAsync(int id)
    {
        return await _ctx.VrstaZivotinje.FindAsync(id);
    }

    public async Task<int> CreateVrstaZivotinjaAsync(VrstaZivotinje novaVrstaZivotinja)
    {
        await _ctx.VrstaZivotinje.AddAsync(novaVrstaZivotinja);
        await _ctx.SaveChangesAsync();
        return novaVrstaZivotinja.IdVrsta;
    }

    public async Task<int> UpdateVrstaZivotinjaAsync(VrstaZivotinje vrstaZivotinja)
    {
        _ctx.VrstaZivotinje.Update(vrstaZivotinja);
        await _ctx.SaveChangesAsync();
        return vrstaZivotinja.IdVrsta;
    }

    public async Task<int> DeleteVrstaZivotinjaAsync(int id)
    {
        VrstaZivotinje vrstaZivotinje = await _ctx.VrstaZivotinje.FindAsync(id);
        _ctx.VrstaZivotinje.Remove(vrstaZivotinje);
        await _ctx.SaveChangesAsync();
        return id;
    }
    
    public async Task<int?> GetZivotniVijekVrsteZivotinje(int id)
    {
        VrstaZivotinje vrstaZivotinje = await _ctx.VrstaZivotinje.FindAsync(id);
        return vrstaZivotinje.ZivotniVijek;
    }
    
    public async Task<List<string>> GetBojeVrstaZivotinja()
    {
        return await _ctx.VrstaZivotinje.Select(vz => vz.Boja).Distinct().ToListAsync();
    }
}