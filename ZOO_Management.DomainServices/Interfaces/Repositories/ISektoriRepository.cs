using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface ISektoriRepository
    {
        Task<List<Sektor>> GetSektoriAsync();
    }
}
