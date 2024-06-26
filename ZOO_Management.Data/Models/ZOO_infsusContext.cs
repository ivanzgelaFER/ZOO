﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ZOO_Management.Data.Models;

public partial class ZOO_infsusContext : DbContext
{
    public ZOO_infsusContext()
    {
    }

    public ZOO_infsusContext(DbContextOptions<ZOO_infsusContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Dogadaj> Dogadaj { get; set; }

    public virtual DbSet<Inventar> Inventar { get; set; }

    public virtual DbSet<Korisnik> Korisnik { get; set; }

    public virtual DbSet<Nastamba> Nastamba { get; set; }

    public virtual DbSet<Posjetitelj> Posjetitelj { get; set; }

    public virtual DbSet<Sektor> Sektor { get; set; }

    public virtual DbSet<Stvar> Stvar { get; set; }

    public virtual DbSet<StvarInventar> StvarInventar { get; set; }

    public virtual DbSet<Ulaznica> Ulaznica { get; set; }

    public virtual DbSet<VrstaZivotinje> VrstaZivotinje { get; set; }

    public virtual DbSet<Zaposlenik> Zaposlenik { get; set; }

    public virtual DbSet<Zivotinja> Zivotinja { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-O6UL4AE\\SQLEXPRESS;Initial Catalog=ZOO;Integrated Security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Dogadaj>(entity =>
        {
            entity.HasKey(e => e.IdDogadaj).HasName("PK__Dogadaj__AAA6435D3DE19D4E");

            entity.Property(e => e.IdDogadaj).HasColumnName("idDogadaj");
            entity.Property(e => e.IdUlaznica).HasColumnName("idUlaznica");
            entity.Property(e => e.IdZaposlenik).HasColumnName("idZaposlenik");
            entity.Property(e => e.Izvodac)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("izvodac");
            entity.Property(e => e.Naziv)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("naziv");
            entity.Property(e => e.TrajeDo)
                .HasColumnType("datetime")
                .HasColumnName("trajeDo");
            entity.Property(e => e.TrajeOd)
                .HasColumnType("datetime")
                .HasColumnName("trajeOd");

            entity.HasOne(d => d.IdUlaznicaNavigation).WithMany(p => p.Dogadaj)
                .HasForeignKey(d => d.IdUlaznica)
                .HasConstraintName("FK__Dogadaj__idUlazn__571DF1D5");

            entity.HasOne(d => d.IdZaposlenikNavigation).WithMany(p => p.Dogadaj)
                .HasForeignKey(d => d.IdZaposlenik)
                .HasConstraintName("FK__Dogadaj__idZapos__5629CD9C");
        });

        modelBuilder.Entity<Inventar>(entity =>
        {
            entity.HasKey(e => e.IdInventar).HasName("PK__Inventar__2407D716AC1C5394");

            entity.Property(e => e.IdInventar).HasColumnName("idInventar");
            entity.Property(e => e.Kolicina).HasColumnName("kolicina");
            entity.Property(e => e.RokTrajanja)
                .HasColumnType("datetime")
                .HasColumnName("rokTrajanja");
            entity.Property(e => e.Vrsta)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("vrsta");
        });

        modelBuilder.Entity<Korisnik>(entity =>
        {
            entity.HasKey(e => e.IdKorisnik).HasName("PK__Korisnik__80AA406303CFD241");

            entity.Property(e => e.IdKorisnik).HasColumnName("idKorisnik");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Ime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ime");
            entity.Property(e => e.KorisnickoIme)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("korisnickoIme");
            entity.Property(e => e.Lozinka)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lozinka");
            entity.Property(e => e.Prezime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("prezime");
        });

        modelBuilder.Entity<Nastamba>(entity =>
        {
            entity.HasKey(e => e.IdNastamba).HasName("PK__Nastamba__48CEAF384B370309");

            entity.Property(e => e.IdNastamba).HasColumnName("idNastamba");
            entity.Property(e => e.IdInventar).HasColumnName("idInventar");
            entity.Property(e => e.IdSektor).HasColumnName("idSektor");
            entity.Property(e => e.IdZaposlenik).HasColumnName("idZaposlenik");
            entity.Property(e => e.Kapacitet).HasColumnName("kapacitet");
            entity.Property(e => e.Naseljena).HasColumnName("naseljena");
            entity.Property(e => e.Tip)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tip");
            entity.Property(e => e.Velicina).HasColumnName("velicina");

            entity.HasOne(d => d.IdInventarNavigation).WithMany(p => p.Nastamba)
                .HasForeignKey(d => d.IdInventar)
                .HasConstraintName("FK__Nastamba__idInve__49C3F6B7");

            entity.HasOne(d => d.IdSektorNavigation).WithMany(p => p.Nastamba)
                .HasForeignKey(d => d.IdSektor)
                .HasConstraintName("FK__Nastamba__idSekt__4AB81AF0");

            entity.HasOne(d => d.IdZaposlenikNavigation).WithMany(p => p.Nastamba)
                .HasForeignKey(d => d.IdZaposlenik)
                .HasConstraintName("FK__Nastamba__idZapo__48CFD27E");
        });

        modelBuilder.Entity<Posjetitelj>(entity =>
        {
            entity.HasKey(e => e.IdPosjetitelj).HasName("PK__Posjetit__CDC1CA2C25ADD1B0");

            entity.Property(e => e.IdPosjetitelj).HasColumnName("idPosjetitelj");
            entity.Property(e => e.IdKorisnik).HasColumnName("idKorisnik");
            entity.Property(e => e.Kontakt).HasColumnName("kontakt");
            entity.Property(e => e.RegistriranOd)
                .HasColumnType("datetime")
                .HasColumnName("registriranOd");

            entity.HasOne(d => d.IdKorisnikNavigation).WithMany(p => p.Posjetitelj)
                .HasForeignKey(d => d.IdKorisnik)
                .HasConstraintName("FK__Posjetite__idKor__3C69FB99");
        });

        modelBuilder.Entity<Sektor>(entity =>
        {
            entity.HasKey(e => e.IdSektor).HasName("PK__Sektor__0F5BE59A1432F53C");

            entity.Property(e => e.IdSektor).HasColumnName("idSektor");
            entity.Property(e => e.Naziv)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("naziv");
            entity.Property(e => e.Povrsina).HasColumnName("povrsina");
        });

        modelBuilder.Entity<Stvar>(entity =>
        {
            entity.HasKey(e => e.IdStvar).HasName("PK__Stvar__A2651B5616587ECC");

            entity.Property(e => e.IdStvar).HasColumnName("idStvar");
            entity.Property(e => e.Cijena).HasColumnName("cijena");
            entity.Property(e => e.Opis)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("opis");
            entity.Property(e => e.SerijskiBroj).HasColumnName("serijskiBroj");
            entity.Property(e => e.Vrsta)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("vrsta");
        });

        modelBuilder.Entity<StvarInventar>(entity =>
        {
            entity.HasKey(e => new { e.IdStvar, e.IdInventar }).HasName("PK__StvarInv__D02566270953BFE2");

            entity.Property(e => e.IdStvar).HasColumnName("idStvar");
            entity.Property(e => e.IdInventar).HasColumnName("idInventar");
            entity.Property(e => e.Kolicina).HasColumnName("kolicina");

            entity.HasOne(d => d.IdInventarNavigation).WithMany(p => p.StvarInventar)
                .HasForeignKey(d => d.IdInventar)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StvarInve__idInv__45F365D3");

            entity.HasOne(d => d.IdStvarNavigation).WithMany(p => p.StvarInventar)
                .HasForeignKey(d => d.IdStvar)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StvarInve__idStv__44FF419A");
        });

        modelBuilder.Entity<Ulaznica>(entity =>
        {
            entity.HasKey(e => e.IdUlaznica).HasName("PK__Ulaznica__A5F45F382EFE2811");

            entity.Property(e => e.IdUlaznica).HasColumnName("idUlaznica");
            entity.Property(e => e.Cijena).HasColumnName("cijena");
            entity.Property(e => e.Datum)
                .HasColumnType("date")
                .HasColumnName("datum");
            entity.Property(e => e.IdPosjetitelj).HasColumnName("idPosjetitelj");

            entity.HasOne(d => d.IdPosjetiteljNavigation).WithMany(p => p.Ulaznica)
                .HasForeignKey(d => d.IdPosjetitelj)
                .HasConstraintName("FK__Ulaznica__idPosj__534D60F1");
        });

        modelBuilder.Entity<VrstaZivotinje>(entity =>
        {
            entity.HasKey(e => e.IdVrsta).HasName("PK__VrstaZiv__306017AD4147432D");

            entity.Property(e => e.IdVrsta).HasColumnName("idVrsta");
            entity.Property(e => e.Boja)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("boja");
            entity.Property(e => e.Visina).HasColumnName("visina");
            entity.Property(e => e.ZivotniVijek).HasColumnName("zivotniVijek");
        });

        modelBuilder.Entity<Zaposlenik>(entity =>
        {
            entity.HasKey(e => e.IdZaposlenik).HasName("PK__Zaposlen__F22F70321747B2F9");

            entity.Property(e => e.IdZaposlenik).HasColumnName("idZaposlenik");
            entity.Property(e => e.IdKorisnik).HasColumnName("idKorisnik");
            entity.Property(e => e.ZaposlenDo)
                .HasColumnType("datetime")
                .HasColumnName("zaposlenDo");
            entity.Property(e => e.ZaposlenOd)
                .HasColumnType("datetime")
                .HasColumnName("zaposlenOd");

            entity.HasOne(d => d.IdKorisnikNavigation).WithMany(p => p.Zaposlenik)
                .HasForeignKey(d => d.IdKorisnik)
                .HasConstraintName("FK__Zaposleni__idKor__398D8EEE");
        });

        modelBuilder.Entity<Zivotinja>(entity =>
        {
            entity.HasKey(e => e.IdZivotinja).HasName("PK__Zivotinj__6A16EA74084EC581");

            entity.Property(e => e.IdZivotinja).HasColumnName("idZivotinja");
            entity.Property(e => e.IdNastamba).HasColumnName("idNastamba");
            entity.Property(e => e.IdVrsta).HasColumnName("idVrsta");
            entity.Property(e => e.Ime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ime");
            entity.Property(e => e.Kapacitet).HasColumnName("kapacitet");
            entity.Property(e => e.Kilaza).HasColumnName("kilaza");
            entity.Property(e => e.Starost).HasColumnName("starost");

            entity.HasOne(d => d.IdNastambaNavigation).WithMany(p => p.Zivotinja)
                .HasForeignKey(d => d.IdNastamba)
                .HasConstraintName("FK__Zivotinja__idNas__4F7CD00D");

            entity.HasOne(d => d.IdVrstaNavigation).WithMany(p => p.Zivotinja)
                .HasForeignKey(d => d.IdVrsta)
                .HasConstraintName("FK__Zivotinja__idVrs__5070F446");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}