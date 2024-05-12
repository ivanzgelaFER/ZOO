using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.VrsteZivotinja;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.ApplicationServices.Services.VrstaZivotinje
{
    public class VrstaZivotinjeService : IVrstaZivotinjeService
    {
        private readonly IVrstaZivotinjeRepository _vrstaZivotinjeRepository;
        
        public VrstaZivotinjeService(IVrstaZivotinjeRepository vrstaZivotinjeRepository)
        {
            _vrstaZivotinjeRepository = vrstaZivotinjeRepository;
        }
        
        public async Task<List<DropdownItemsListResponse>> getVrsteZivotinjaOptions()
        {
            List<DomainModel.Models.VrstaZivotinje> vrsteZivotinje = await _vrstaZivotinjeRepository.GetVrsteZivotinjaAsync();
            List<DropdownItemsListResponse> response = VrstaZivotinjeMapper.MapVrstaZivotinjeToDropdownItemsListResponse(vrsteZivotinje);
            return response;
        }
        
        public async Task<List<VrstaZivotinjeGetResponse>> GetVrsteZivotinjeAsync()
        {
            List<DomainModel.Models.VrstaZivotinje> vrsteZivotinje = await _vrstaZivotinjeRepository.GetVrsteZivotinjaAsync();
            List<VrstaZivotinjeGetResponse> response = VrstaZivotinjeMapper.MapVrstaZivotinjeToVrstaZivotinjeGetResponse(vrsteZivotinje);
            return response;
        }

        public async Task<VrstaZivotinjeGetResponse> GetVrstaZivotinjeByIdAsync(int id)
        {
            DomainModel.Models.VrstaZivotinje vrstaZivotinje = await _vrstaZivotinjeRepository.GetVrstaZivotinjaByIdAsync(id);
            VrstaZivotinjeGetResponse response = VrstaZivotinjeMapper.MapVrstaZivotinjeToVrstaZivotinjeGetResponse(vrstaZivotinje);
            return response;
        }

        public async Task<int> CreateVrstaZivotinjeAsync(VrstaZivotinjeCreateNewRequest request)
        {
            DomainModel.Models.VrstaZivotinje novaVrstaZivotinje = VrstaZivotinjeMapper.MapVrstaZivotinjeCreateNewRequestToVrstaZivotinje(request);
            return await _vrstaZivotinjeRepository.CreateVrstaZivotinjaAsync(novaVrstaZivotinje);
        }

        public async Task<int> UpdateVrstaZivotinjeAsync(VrstaZivotinjeUpdateRequest request)
        {
            DomainModel.Models.VrstaZivotinje vrstaZivotinje = VrstaZivotinjeMapper.MapVrstaZivotinjeUpdateRequestToVrstaZivotinje(request);
            return await _vrstaZivotinjeRepository.UpdateVrstaZivotinjaAsync(vrstaZivotinje);
        }

        public async Task<int> DeleteVrstaZivotinjeAsync(int id)
        {
            return await _vrstaZivotinjeRepository.DeleteVrstaZivotinjaAsync(id);
        }
    }
}
