using ZOO_Management.DomainModel.RequestModels.Sektori;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Sektori;

namespace ZOO_Management.ApplicationServices.Services.Sektori
{
    public interface ISektorService
    {
        /// <summary>
        /// Za dropdown opcije
        /// </summary>
        Task<List<DropdownItemsListResponse>> getSektoriOptions();

        /// <summary>
        /// Vraća popis svih sektora u zoološkom vrtu
        /// </summary>
        /// <returns></returns>
        Task<List<SektorGetResponse>> GetSektoriAsync();

        /// <summary>
        /// Vraća sektor s određenim ID-jem
        /// </summary>
        /// <returns></returns>
        Task<SektorGetResponse> GetSektorByIdAsync(int id);

        /// <summary>
        /// Stvara novi sektor
        /// </summary>
        /// <returns></returns>
        Task<int> CreateSektorAsync(SektorCreateNewRequest request);

        /// <summary>
        /// Ažurira postojeći sektor
        /// </summary>
        /// <returns></returns>
        Task<int> UpdateSektorAsync(SektorUpdateRequest request);

        /// <summary>
        /// Briše sektor s određenim ID-jem
        /// </summary>
        /// <returns></returns>
        Task<int> DeleteSektorAsync(int id);
        
        Task<List<string>> GetNaziviSektora();

    }
}
