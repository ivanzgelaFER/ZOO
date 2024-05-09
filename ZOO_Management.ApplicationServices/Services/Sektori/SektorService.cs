using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.ResponseModels;
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
    }
}
