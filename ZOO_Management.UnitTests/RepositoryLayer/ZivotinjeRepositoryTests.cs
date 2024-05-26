using Xunit;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.Infrastructure.Repositories;
using Assert = Xunit.Assert;

namespace ZOO_Management.UnitTests.RepositoryLayer;

public class ZivotinjeRepositoryTests : IClassFixture<TestFixture>, IDisposable
{
    private readonly TestFixture _testFixture;
    private readonly ZOO_infsusContext _dbContext;
    private readonly ZivotinjeRepository _sektoriRepository;
    
    public ZivotinjeRepositoryTests(TestFixture testFixture)
    {
        _testFixture = testFixture;
        _dbContext = testFixture.CreateContext();
        _sektoriRepository = new ZivotinjeRepository(_dbContext);
    }
    
    [Fact]
    public async Task GetByNastambaIdAsync_ReturnsAllAnimalsInNastamba()
    {
        // Arrange
        _testFixture.SeedZivotinje(_dbContext, new List<Zivotinja>
        {
            new Zivotinja { IdZivotinja = 1, Ime = "Zivotinja 1", IdNastamba = 1 },
            new Zivotinja { IdZivotinja = 2, Ime = "Zivotinja 2", IdNastamba = 1 }
        });
        
        // Act
        var result = await _sektoriRepository.GetByNastambaIdAsync(1);
        
        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Zivotinja 1", result[0].Ime);
        Assert.Equal("Zivotinja 2", result[1].Ime);
    }
    
    [Fact]
    public async Task GetZivotinjaByIdAsync_ReturnsZivotinjaById()
    {
        // Arrange
        _testFixture.SeedZivotinja(_dbContext, new Zivotinja { IdZivotinja = 3, Ime = "Zivotinja 3", IdNastamba = 1 });
        
        // Act
        var result = await _sektoriRepository.GetZivotinjaByIdAsync(3);
        
        // Assert
        Assert.Equal("Zivotinja 3", result.Ime);
    }
    
    [Fact]
    public async Task CreateZivotinjaAsync_CreatesNewZivotinja()
    {
        // Arrange
        var zivotinja = new Zivotinja { IdZivotinja = 4, Ime = "Zivotinja 4", IdNastamba = 1 };
        
        // Act
        await _sektoriRepository.CreateZivotinjaAsync(zivotinja);
        
        // Assert
        var result = await _sektoriRepository.GetZivotinjaByIdAsync(4);
        Assert.Equal("Zivotinja 4", result.Ime);
    }
    
    [Fact]
    public async Task UpdateZivotinjaAsync_UpdatesZivotinja()
    {
        // Arrange
        _testFixture.SeedZivotinja(_dbContext, new Zivotinja { IdZivotinja = 5, Ime = "Zivotinja 5", IdNastamba = 1 });
        
        // Act
        var zivotinja = await _sektoriRepository.GetZivotinjaByIdAsync(5);
        zivotinja.Ime = "Zivotinja 6";
        await _sektoriRepository.UpdateZivotinjaAsync(zivotinja);
        
        // Assert
        var result = await _sektoriRepository.GetZivotinjaByIdAsync(5);
        Assert.Equal("Zivotinja 6", result.Ime);
    }
    
    [Fact]
    public async Task DeleteZivotinjaAsync_DeletesZivotinja()
    {
        // Arrange
        _testFixture.SeedZivotinja(_dbContext, new Zivotinja { IdZivotinja = 6, Ime = "Zivotinja 6", IdNastamba = 1 });
        
        // Act
        await _sektoriRepository.DeleteZivotinjaAsync(6);
        
        // Assert
        var result = await _sektoriRepository.GetZivotinjaByIdAsync(6);
        Assert.Null(result);
    }
    
    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }
}