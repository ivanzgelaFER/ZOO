﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.Infrastructure.Models;

public partial class Nastamba
{
    public int IdNastamba { get; set; }

    public int? IdZaposlenik { get; set; }

    public int? IdInventar { get; set; }

    public int? IdSektor { get; set; }

    public int? Velicina { get; set; }

    public int? Kapacitet { get; set; }

    public string Tip { get; set; }

    public bool? Naseljena { get; set; }

    public virtual Inventar IdInventarNavigation { get; set; }

    public virtual Sektor IdSektorNavigation { get; set; }

    public virtual Zaposlenik IdZaposlenikNavigation { get; set; }

    public virtual ICollection<Zivotinja> Zivotinja { get; set; } = new List<Zivotinja>();
}