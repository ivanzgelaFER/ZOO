using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Zivotinje;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.ApplicationServices.Services.Zivotinje
{
    public class ZivotinjeService : IZivotinjeService
    {
        private readonly IZivotinjeRepository _zivotinjeRepository;
        public ZivotinjeService(IZivotinjeRepository zivotinjeRepository)
        {
            _zivotinjeRepository = zivotinjeRepository;
        }

        public async Task<List<ZivotinjeGetByNastambaIdResponse>> GetByNastambaIdAsync(int nastambaId)
        {
            List<Zivotinja> zivotinje = await _zivotinjeRepository.GetByNastambaIdAsync(nastambaId);
            List<ZivotinjeGetByNastambaIdResponse> response = ZivotinjeMapper.MapZivotinjeToZivotinjeGetByNastambaIdResponse(zivotinje);
            return response;
        }

        public async Task<int> UpdateZivotinjaAsync(ZivotinjaUpdateRequest request)
        {
            Zivotinja zivotinja = ZivotinjeMapper.MapZivotinjaUpdateRequestToZivotinja(request);
            return await _zivotinjeRepository.UpdateZivotinjaAsync(zivotinja);
        }
    }
}
