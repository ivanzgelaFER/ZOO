using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface INastambeRepository
    {
        Task<List<Nastamba>> GetNastambeAsync();
    }
}
