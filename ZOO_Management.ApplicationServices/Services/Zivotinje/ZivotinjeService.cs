using Microsoft.AspNetCore.Http.HttpResults;
using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Zivotinje;
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

        public async Task<int> DeleteZivotinjaAsync(int id)
        {
            return await _zivotinjeRepository.DeleteZivotinjaAsync(id);
        }

        public async Task<List<ZivotinjeGetResponse>> GetZivotinjeAsync()
        {
            List<Zivotinja> zivotinje = await _zivotinjeRepository.GetZivotinjeAsync();
            List<ZivotinjeGetResponse> response = ZivotinjeMapper.MapZivotinjeToZivotinjeGetResponse(zivotinje);
            return response;
        }

        public async Task<ZivotinjeGetResponse> GetZivotinjaByIdAsync(int id)
        {
            Zivotinja zivotinja = await _zivotinjeRepository.GetZivotinjaByIdAsync(id);
            ZivotinjeGetResponse response = ZivotinjeMapper.MapZivotinjaToZivotinjeGetResponse(zivotinja);
            return response;
        }

        public async Task<int> CreateZivotinjaAsync(ZivotinjaCreateNewRequest request)
        {
            Zivotinja novaZivotinja = ZivotinjeMapper.MapZivotinjaCreateNewRequestToZivotinja(request);
            return await _zivotinjeRepository.CreateZivotinjaAsync(novaZivotinja);
        }
    }
}
