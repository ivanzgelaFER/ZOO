﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.Data.Models;

public partial class Dogadaj
{
    public int IdDogadaj { get; set; }

    public int? IdUlaznica { get; set; }

    public int? IdZaposlenik { get; set; }

    public string Naziv { get; set; }

    public DateTime? TrajeOd { get; set; }

    public DateTime? TrajeDo { get; set; }

    public string Izvodac { get; set; }

    public virtual Ulaznica IdUlaznicaNavigation { get; set; }

    public virtual Zaposlenik IdZaposlenikNavigation { get; set; }
}