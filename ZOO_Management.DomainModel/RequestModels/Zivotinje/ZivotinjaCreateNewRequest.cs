﻿namespace ZOO_Management.DomainModel.RequestModels.Zivotinje;

public class ZivotinjaCreateNewRequest
{
    public int IdNastamba { get; set; }

    public int IdVrsta { get; set; }

    public int? Starost { get; set; }

    public int? Kilaza { get; set; }

    public string Ime { get; set; }
    
    public int? Kapacitet { get; set; }
}