using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories;

public interface IVrstaZivotinjeRepository
{
    Task<List<VrstaZivotinje>> GetVrsteZivotinjaAsync();
    Task<VrstaZivotinje> GetVrstaZivotinjaByIdAsync(int id);
    Task<int> CreateVrstaZivotinjaAsync(VrstaZivotinje novaVrstaZivotinja);
    Task<int> UpdateVrstaZivotinjaAsync(VrstaZivotinje vrstaZivotinja);
    Task<int> DeleteVrstaZivotinjaAsync(int id);
    Task<int?> GetZivotniVijekVrsteZivotinje(int id);
}