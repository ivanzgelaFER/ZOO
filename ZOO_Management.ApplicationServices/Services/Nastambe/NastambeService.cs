using Org.BouncyCastle.Asn1.Crmf;
using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.ApplicationServices.Services.Nastambe
{
    public class NastambeService : INastambeService
    {
        private readonly INastambeRepository _nastambeRepository;
        private readonly IZivotinjeRepository _zivotinjeRepository;

        public NastambeService(INastambeRepository nastambeRepository, IZivotinjeRepository zivotinjeRepository)
        {
            _nastambeRepository = nastambeRepository;
            _zivotinjeRepository = zivotinjeRepository;
        }

        public async Task<List<NastambeGetResponse>> GetNastambeAsync()
        {
            List<Nastamba> nastambe = await _nastambeRepository.GetNastambeAsync();
            List<NastambeGetResponse> response = NastambeMapper.MapNastambeToNastambeGetResponse(nastambe);
            foreach (NastambeGetResponse nast in response)
            {
                var nastambaZivotinje = await _zivotinjeRepository.GetByNastambaIdAsync(nast.IdNastamba);
                nast.Zivotinje = ZivotinjeMapper.MapZivotinjeToZivotinjeGetByNastambaIdResponse(nastambaZivotinje);
            }
            return response;
        }

        public async Task<NastambeGetResponse> GetNastambaByIdAsync(int id)
        {
            Nastamba nastamba = await _nastambeRepository.GetNastambaByIdAsync(id);
            NastambeGetResponse response = NastambeMapper.MapNastambaToNastambeGetResponse(nastamba);
            var nastambaZivotinje = await _zivotinjeRepository.GetByNastambaIdAsync(response.IdNastamba);
            response.Zivotinje = ZivotinjeMapper.MapZivotinjeToZivotinjeGetByNastambaIdResponse(nastambaZivotinje);
            return response;
        }

        public async Task<int> CreateNastambaAsync(NastambaCreateNewRequest request)
        {
            Nastamba novaNastamba = NastambeMapper.MapNastambaCreateNewRequestToNastamba(request);
            return await _nastambeRepository.CreateNastambaAsync(novaNastamba);
        }

        public async Task<int> UpdateNastambaAsync(NastambaUpdateRequest request)
        {
            Nastamba nastamba = NastambeMapper.MapNastambaUpdateRequestToNastamba(request);
            return await _nastambeRepository.UpdateNastambaAsync(nastamba);
        }

        public async Task<int> DeleteNastambaAsync(int id)
        {
            return await _nastambeRepository.DeleteNastambaAsync(id);
        }

    }
}
