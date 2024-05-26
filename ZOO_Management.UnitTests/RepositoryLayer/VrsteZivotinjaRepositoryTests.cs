using Xunit;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.Infrastructure.Repositories;
using Assert = Xunit.Assert;

namespace ZOO_Management.UnitTests.RepositoryLayer;

public class VrsteZivotinjaRepositoryTests : IClassFixture<TestFixture>, IDisposable
{

    private readonly TestFixture _testFixture;
    private readonly ZOO_infsusContext _dbContext;
    private readonly VrstaZivotinjeRepository _vrsteZivotinjaRepository;

    public VrsteZivotinjaRepositoryTests(TestFixture testFixture)
    {
        _testFixture = testFixture;
        _dbContext = testFixture.CreateContext();
        _vrsteZivotinjaRepository = new VrstaZivotinjeRepository(_dbContext);
    }

    [Fact]
    public async Task GetVrsteZivotinjaAsync_ReturnsAllVrsteZivotinja()
    {
        // Arrange
        _testFixture.SeedVrsteZivotinja(_dbContext, new List<VrstaZivotinje>
        {
            new VrstaZivotinje { IdVrsta = 1, Boja = "Boja 1", Visina = 10},
            new VrstaZivotinje { IdVrsta = 2, Boja = "Boja 2", Visina = 20}
        });

        // Act
        var result = await _vrsteZivotinjaRepository.GetVrsteZivotinjaAsync();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Boja 1", result[0].Boja);
        Assert.Equal("Boja 2", result[1].Boja);
    }

    [Fact]
    public async Task GetVrstaZivotinjeByIdAsync_ReturnsVrstaZivotinjeById()
    {
        // Arrange
        _testFixture.SeedVrstaZivotinje(_dbContext, new VrstaZivotinje { IdVrsta = 3, Boja = "Boja 3", Visina = 30 });

        // Act
        var result = await _vrsteZivotinjaRepository.GetVrstaZivotinjaByIdAsync(3);

        // Assert
        Assert.Equal("Boja 3", result.Boja);
    }

    [Fact]
    public async Task CreateVrstaZivotinjeAsync_CreatesNewVrstaZivotinje()
    {
        //Arrange
        var vrstaZivotinje = new VrstaZivotinje { IdVrsta = 4, Boja = "Boja 4", Visina = 40 };
        
        //Act
        await _vrsteZivotinjaRepository.CreateVrstaZivotinjaAsync(vrstaZivotinje);
        
        //Assert
        var result = await _vrsteZivotinjaRepository.GetVrstaZivotinjaByIdAsync(4);
        Assert.Equal("Boja 4", result.Boja);
    }
    
    [Fact]
    public async Task GetBojeVrstaZivotinja_ReturnsAllBojeVrstaZivotinja()
    {
        // Arrange
        _testFixture.SeedVrsteZivotinja(_dbContext, new List<VrstaZivotinje>
        {
            new VrstaZivotinje { IdVrsta = 1, Boja = "Boja 1", Visina = 10},
            new VrstaZivotinje { IdVrsta = 2, Boja = "Boja 2", Visina = 20}
        });

        // Act
        var result = await _vrsteZivotinjaRepository.GetBojeVrstaZivotinja();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Boja 1", result[0]);
        Assert.Equal("Boja 2", result[1]);
    }

    public void Dispose()
    {
        _testFixture.Dispose();
        _dbContext.Dispose();
    }
}
