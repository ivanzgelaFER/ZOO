﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ZOO_Management.Data.Models;

public partial class Korisnik
{
    public int IdKorisnik { get; set; }

    public string KorisnickoIme { get; set; }

    public string Email { get; set; }

    public string Lozinka { get; set; }

    public string Ime { get; set; }

    public string Prezime { get; set; }

    public virtual ICollection<Posjetitelj> Posjetitelj { get; set; } = new List<Posjetitelj>();

    public virtual ICollection<Zaposlenik> Zaposlenik { get; set; } = new List<Zaposlenik>();
}