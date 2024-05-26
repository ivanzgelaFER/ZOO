using ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.VrsteZivotinja;

namespace ZOO_Management.ApplicationServices.Services.VrstaZivotinje
{
    public interface IVrstaZivotinjeService
    {
        Task<List<DropdownItemsListResponse>> getVrsteZivotinjaOptions();
        Task<List<VrstaZivotinjeGetResponse>> GetVrsteZivotinjeAsync();
        Task<VrstaZivotinjeGetResponse> GetVrstaZivotinjeByIdAsync(int id);
        Task<int> CreateVrstaZivotinjeAsync(VrstaZivotinjeCreateNewRequest request);
        Task<int> UpdateVrstaZivotinjeAsync(VrstaZivotinjeUpdateRequest request);
        Task<int> DeleteVrstaZivotinjeAsync(int id);
        Task<int?> GetZivotniVijekVrsteZivotinje(int id);
    }
}
