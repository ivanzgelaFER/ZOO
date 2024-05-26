using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;

namespace ZOO_Management.ApplicationServices.Services.Nastambe
{
    public interface INastambeService
    {
        /// <summary>
        /// Vraca popis svih nastambi u zooloskom vrtu
        /// </summary>
        /// <returns></returns>
        Task<List<NastambeGetResponse>> GetNastambeAsync();

        /// <summary>
        /// Vraca nastambu s odredenim id-jem
        /// </summary>
        /// <returns></returns>
        Task<NastambeGetResponse> GetNastambaByIdAsync(int id);

        /// <summary>
        /// Kreira novu nastambu
        /// </summary>
        /// <returns></returns>
        Task<int> CreateNastambaAsync(NastambaCreateNewRequest request);

        /// <summary>
        /// Azurira postojecu nastambu
        /// </summary>
        /// <returns></returns>
        Task<int> UpdateNastambaAsync(NastambaUpdateRequest request);
        
        /// <summary>
        /// Brise nastambu s odredenim id-jem
        /// </summary>
        /// <returns></returns>
        Task<int> DeleteNastambaAsync(int id);
        
        Task<List<DropdownItemsListResponse>> GetNastambeOptions();
        
        Task<List<string>> GetTipovi();
    }
}
