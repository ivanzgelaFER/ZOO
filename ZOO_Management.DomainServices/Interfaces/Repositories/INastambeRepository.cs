using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface INastambeRepository
    {
        Task<List<Nastamba>> GetNastambeAsync();
        Task<Nastamba> GetNastambaByIdAsync(int id);
        Task<int> CreateNastambaAsync(Nastamba nastamba);
        Task<int> UpdateNastambaAsync(Nastamba nastamba);
        Task<int> DeleteNastambaAsync(int id);
    }
}
