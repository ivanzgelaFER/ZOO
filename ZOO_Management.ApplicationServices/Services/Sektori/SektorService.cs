using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Sektori;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.Sektori;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.ApplicationServices.Services.Sektori
{
    public class SektorService : ISektorService
    {
        private readonly ISektoriRepository _sektoriRepository;
        public SektorService(ISektoriRepository sektoriRepository)
        {
            _sektoriRepository = sektoriRepository;
        }

        public async Task<List<DropdownItemsListResponse>> getSektoriOptions()
        {
            List<Sektor> sektori = await _sektoriRepository.GetSektoriAsync();
            List<DropdownItemsListResponse> result = new List<DropdownItemsListResponse>();
            foreach (var sektor in sektori)
            {
                result.Add(new DropdownItemsListResponse
                {
                    Label = sektor.Naziv,
                    Value = sektor.IdSektor
                });
            }
            return result;
        }
        public async Task<List<SektorGetResponse>> GetSektoriAsync()
        {
            var sektori = await _sektoriRepository.GetSektoriAsync();
            
            return SektoriMapper.MapSektoriToSektorGetResponse(sektori);
        }
        public async Task<SektorGetResponse> GetSektorByIdAsync(int id)
        {
            var sektor = await _sektoriRepository.GetSektorByIdAsync(id);
            return SektoriMapper.MapSektorToSektorGetResponse(sektor);
        }
        public async Task<int> CreateSektorAsync(SektorCreateNewRequest sektor)
        {
            var noviSektor = SektoriMapper.MapSektorCreateNewRequestToSektor(sektor);
            return await _sektoriRepository.CreateSektorAsync(noviSektor);
        }
        public async Task<int> UpdateSektorAsync(SektorUpdateRequest sektor)
        {
            var s = SektoriMapper.MapSektoraUpdateRequestToSektor(sektor);
            return await _sektoriRepository.UpdateSektorAsync(s);
        }
        public async Task<int> DeleteSektorAsync(int id)
        {
            return await _sektoriRepository.DeleteSektorAsync(id);
        }
    }
}
