using ZOO_Management.DomainModel.ResponseModels;

namespace ZOO_Management.ApplicationServices.Services.Sektori
{
    public interface ISektorService
    {
        Task<List<DropdownItemsListResponse>> getSektoriOptions();
    }
}
