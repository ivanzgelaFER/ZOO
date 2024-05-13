namespace ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;

public class VrstaZivotinjeUpdateRequest
{
    public int IdVrsta { get; set; }

    public string Boja { get; set; }

    public int? Visina { get; set; }

    public int? ZivotniVijek { get; set; }   
}