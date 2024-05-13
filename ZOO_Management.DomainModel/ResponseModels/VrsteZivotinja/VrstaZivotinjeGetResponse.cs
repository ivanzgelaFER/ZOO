namespace ZOO_Management.DomainModel.ResponseModels.VrsteZivotinja;

public class VrstaZivotinjeGetResponse
{
    public int IdVrsta { get; set; }

    public string Boja { get; set; }

    public int? Visina { get; set; }

    public int? ZivotniVijek { get; set; }
}