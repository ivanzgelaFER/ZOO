﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.Data.Models;

public partial class Zaposlenik
{
    public int IdZaposlenik { get; set; }

    public int? IdKorisnik { get; set; }

    public DateTime? ZaposlenOd { get; set; }

    public DateTime? ZaposlenDo { get; set; }

    public virtual ICollection<Dogadaj> Dogadaj { get; set; } = new List<Dogadaj>();

    public virtual Korisnik IdKorisnikNavigation { get; set; }

    public virtual ICollection<Nastamba> Nastamba { get; set; } = new List<Nastamba>();
}