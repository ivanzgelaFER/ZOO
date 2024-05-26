using Microsoft.EntityFrameworkCore;
using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.UnitTests.RepositoryLayer;


public class TestFixture : IDisposable
{
    private readonly DbContextOptions<ZOO_infsusContext> _options;

    public TestFixture()
    {
        _options = new DbContextOptionsBuilder<ZOO_infsusContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    public ZOO_infsusContext CreateContext()
    {
        var context = new ZOO_infsusContext(_options);
        context.Database.EnsureCreated();
        return context;
    }

    public void SeedSektori(ZOO_infsusContext context, List<Sektor> sektori)
    {
        context.Sektor.AddRange(sektori);
        context.SaveChanges();
    }

    public void SeedSektor(ZOO_infsusContext context, Sektor sektor)
    {
        context.Sektor.Add(sektor);
        context.SaveChanges();
    }
    
    public void SeedZivotinje(ZOO_infsusContext context, List<Zivotinja> zivotinje)
    {
        context.Zivotinja.AddRange(zivotinje);
        context.SaveChanges();
    }
    
    public void SeedZivotinja(ZOO_infsusContext context, Zivotinja zivotinja)
    {
        context.Zivotinja.Add(zivotinja);
        context.SaveChanges();
    }
    
    public void SeedVrsteZivotinja(ZOO_infsusContext context, List<VrstaZivotinje> vrsteZivotinja)
    {
        context.VrstaZivotinje.AddRange(vrsteZivotinja);
        context.SaveChanges();
    }
    
    public void SeedVrstaZivotinje(ZOO_infsusContext context, VrstaZivotinje vrstaZivotinje)
    {
        context.VrstaZivotinje.Add(vrstaZivotinje);
        context.SaveChanges();
    }
    
    public void SeedNastambe(ZOO_infsusContext context, List<Nastamba> nastambe)
    {
        context.Nastamba.AddRange(nastambe);
        context.SaveChanges();
    }
    
    public void SeedNastamba(ZOO_infsusContext context, Nastamba nastamba)
    {
        context.Nastamba.Add(nastamba);
        context.SaveChanges();
    }

    public void Dispose()
    {
        using (var context = new ZOO_infsusContext(_options))
        {
            context.Database.EnsureDeleted();
        }
    }
}