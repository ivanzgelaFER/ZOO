using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface ISektoriRepository
    {
        Task<List<Sektor>> GetSektoriAsync();
        Task<Sektor> GetSektorByIdAsync(int id);
        Task<int> CreateSektorAsync(Sektor sektor);
        Task<int> UpdateSektorAsync(Sektor sektor);
        Task<int> DeleteSektorAsync(int id);
    }
}
