using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface IZivotinjeRepository
    {
        Task<List<Zivotinja>> GetByNastambaIdAsync(int nastambaId);
    }
}
