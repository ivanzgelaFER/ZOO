﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.DomainModel.Models;

public partial class Inventar
{
    public int IdInventar { get; set; }

    public int? Kolicina { get; set; }

    public string Vrsta { get; set; }

    public DateTime? RokTrajanja { get; set; }

    public virtual ICollection<Nastamba> Nastamba { get; set; } = new List<Nastamba>();

    public virtual ICollection<StvarInventar> StvarInventar { get; set; } = new List<StvarInventar>();
}