﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.Data.Models;

public partial class Zivotinja
{
    public int IdZivotinja { get; set; }

    public int? IdNastamba { get; set; }

    public int? IdVrsta { get; set; }

    public int? Starost { get; set; }

    public int? Kilaza { get; set; }

    public string Ime { get; set; }

    public int? Kapacitet { get; set; }

    public virtual Nastamba IdNastambaNavigation { get; set; }

    public virtual VrstaZivotinje IdVrstaNavigation { get; set; }
}