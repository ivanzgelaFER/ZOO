using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Zivotinje;

namespace ZOO_Management.ApplicationServices.Services.Zivotinje
{
    public interface IZivotinjeService
    {
        /// <summary>
        /// Vraca popis svih zivotinja u odredenoj nastambi
        /// </summary>
        /// <returns></returns>
        Task<List<ZivotinjeGetByNastambaIdResponse>> GetByNastambaIdAsync(int nastambaId);

        /// <summary>
        /// Azurira postojecu zivotinju
        /// </summary>
        /// <returns></returns>
        Task<int> UpdateZivotinjaAsync(ZivotinjaUpdateRequest request);
    }
}
