using ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;
using ZOO_Management.DomainModel.ResponseModels;
using ZOO_Management.DomainModel.ResponseModels.VrsteZivotinja;

namespace ZOO_Management.ApplicationServices.Mappers;

public class VrstaZivotinjeMapper
{
    public static List<DropdownItemsListResponse> MapVrstaZivotinjeToDropdownItemsListResponse(List<DomainModel.Models.VrstaZivotinje> vrsteZivotinje)
    {
        List<DropdownItemsListResponse> response = new List<DropdownItemsListResponse>();
        foreach (DomainModel.Models.VrstaZivotinje vrstaZivotinje in vrsteZivotinje)
        {
            response.Add(new DropdownItemsListResponse
            {
                Label = vrstaZivotinje.Boja,
                Value = vrstaZivotinje.IdVrsta
            });
        }
        return response;
    }
    public static List<VrstaZivotinjeGetResponse> MapVrstaZivotinjeToVrstaZivotinjeGetResponse(List<DomainModel.Models.VrstaZivotinje> vrsteZivotinje)
    {
        List<VrstaZivotinjeGetResponse> response = new List<VrstaZivotinjeGetResponse>();
        foreach (DomainModel.Models.VrstaZivotinje vrstaZivotinje in vrsteZivotinje)
        {
            response.Add(MapVrstaZivotinjeToVrstaZivotinjeGetResponse(vrstaZivotinje));
        }
        return response;
    }
    
    public static VrstaZivotinjeGetResponse MapVrstaZivotinjeToVrstaZivotinjeGetResponse(DomainModel.Models.VrstaZivotinje vrstaZivotinje)
    {
        return new VrstaZivotinjeGetResponse
        {
            IdVrsta = vrstaZivotinje.IdVrsta,
            Boja = vrstaZivotinje.Boja,
            Visina = vrstaZivotinje.Visina,
            ZivotniVijek = vrstaZivotinje.ZivotniVijek
        };
    }
    
    public static DomainModel.Models.VrstaZivotinje MapVrstaZivotinjeCreateNewRequestToVrstaZivotinje(VrstaZivotinjeCreateNewRequest request)
    {
        return new DomainModel.Models.VrstaZivotinje
        {
            Boja = request.Boja,
            Visina = request.Visina,
            ZivotniVijek = request.ZivotniVijek
        };
    }
    
    public static DomainModel.Models.VrstaZivotinje MapVrstaZivotinjeUpdateRequestToVrstaZivotinje(VrstaZivotinjeUpdateRequest request)
    {
        return new DomainModel.Models.VrstaZivotinje
        {
            IdVrsta = request.IdVrsta,
            Boja = request.Boja,
            Visina = request.Visina,
            ZivotniVijek = request.ZivotniVijek
        };
    }
}