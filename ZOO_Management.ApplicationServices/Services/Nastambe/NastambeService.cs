using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.ApplicationServices.Services.Nastambe
{
    public class NastambeService : INastambeService
    {
        private readonly INastambeRepository _nastambeRepository;
        public NastambeService(INastambeRepository nastambeRepository)
        {
            _nastambeRepository = nastambeRepository;
        }

        public async Task<List<NastambeGetResponse>> GetNastambeAsync()
        {
            List<Nastamba> nastambe = await _nastambeRepository.GetNastambeAsync();
            List<NastambeGetResponse> response = NastambeMapper.MapNastambeToNastambeGetResponse(nastambe);
            return response;
        }
    }
}
