using Microsoft.EntityFrameworkCore;
using Xunit;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.Infrastructure.Repositories;
using Assert = Xunit.Assert;

namespace ZOO_Management.UnitTests.RepositoryLayer;

public class NastambeRepositoryTests : IClassFixture<TestFixture>, IDisposable
{
    private readonly TestFixture _testFixture;
    private readonly ZOO_infsusContext _dbContext;
    private readonly NastambeRepository _nastambeRepository;
    
    public NastambeRepositoryTests(TestFixture testFixture)
    {
        _testFixture = testFixture;
        _dbContext = testFixture.CreateContext();
        _nastambeRepository = new NastambeRepository(_dbContext);
    }
    
    [Fact]
    public async Task GetNastambeAsync_ReturnsAllNastambe()
    {
        // Arrange
        _testFixture.SeedNastambe(_dbContext, new List<Nastamba>
        {
            new Nastamba { IdNastamba = 1, Tip = "Nastamba 1", Kapacitet = 10, Velicina = 20, Naseljena = true},
            new Nastamba { IdNastamba = 2, Tip = "Nastamba 2", Kapacitet = 15, Velicina = 25, Naseljena = false}
        });
        
        // Act
        var result = await _nastambeRepository.GetNastambeAsync();
        
        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Nastamba 1", result[0].Tip);
        Assert.Equal("Nastamba 2", result[1].Tip);
    }
    
    [Fact]
    public async Task GetNastambaByIdAsync_ReturnsNastambaById()
    {
        // Arrange
        _testFixture.SeedNastamba(_dbContext, new Nastamba { IdNastamba = 3, Tip = "Nastamba 3", Kapacitet = 10, Velicina = 20, Naseljena = true});
        
        // Act
        var result = await _nastambeRepository.GetNastambaByIdAsync(3);
        
        // Assert
        Assert.Equal("Nastamba 3", result.Tip);
    }
    
    [Fact]
    public async Task CreateNastambaAsync_CreatesNewNastamba()
    {
        // Arrange
        var newNastamba = new Nastamba { IdNastamba = 4, Tip = "Nastamba 4", Kapacitet = 10, Velicina = 20, Naseljena = true};
        
        // Act
        var result = await _nastambeRepository.CreateNastambaAsync(newNastamba);
        
        // Assert
        Assert.Equal(4, result);
    }
    
    [Fact]
    public async Task UpdateNastambaAsync_UpdatesNastamba()
    {
        // Arrange
        var nastamba = new Nastamba { IdNastamba = 5, Tip = "Nastamba 5", Kapacitet = 15, Velicina = 25, Naseljena = false};
        var createResult = _nastambeRepository.CreateNastambaAsync(nastamba);
        
        // Act
        nastamba.Tip = "Nastamba 5 Updated";
        var result = await _nastambeRepository.UpdateNastambaAsync(nastamba);
        
        // Assert
        var updatedNastamba = await _nastambeRepository.GetNastambaByIdAsync(5);
        Assert.Equal("Nastamba 5 Updated", updatedNastamba.Tip);
    }
    
    [Fact]
    public async Task DeleteNastambaAsync_DeletesNastamba()
    {
        // Arrange
        _testFixture.SeedNastamba(_dbContext, new Nastamba { IdNastamba = 6, Tip = "Nastamba 6", Kapacitet = 10, Velicina = 20, Naseljena = true});
        
        // Act
        var result = await _nastambeRepository.DeleteNastambaAsync(6);
        
        // Assert
        Assert.Equal(6, result);
    }
    
    [Fact]
    public async Task GetTipovi_ReturnsAllTipovi()
    {
        // Arrange
        _testFixture.SeedNastambe(_dbContext, new List<Nastamba>
        {
            new Nastamba { IdNastamba = 7, Tip = "Nastamba 7", Kapacitet = 10, Velicina = 20, Naseljena = true},
            new Nastamba { IdNastamba = 8, Tip = "Nastamba 8", Kapacitet = 15, Velicina = 25, Naseljena = false}
        });
        
        // Act
        var result = await _nastambeRepository.GetTipovi();
        
        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Nastamba 7", result[0]);
        Assert.Equal("Nastamba 8", result[1]);
    }

    public void Dispose()
    {
        _testFixture.Dispose();
        _dbContext.Dispose();
    }
}
