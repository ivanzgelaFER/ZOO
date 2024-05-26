using Xunit;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.Infrastructure.Repositories;
using Assert = Xunit.Assert;

namespace ZOO_Management.UnitTests.RepositoryLayer;

public class SektoriRepositoryTests : IClassFixture<TestFixture>, IDisposable
{
    private readonly TestFixture _testFixture;
    private readonly ZOO_infsusContext _dbContext;
    private readonly SektoriRepository _sektoriRepository;

    public SektoriRepositoryTests(TestFixture testFixture)
    {
        _testFixture = testFixture;
        _dbContext = testFixture.CreateContext();
        _sektoriRepository = new SektoriRepository(_dbContext);
    }

    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    [Fact]
    public async Task GetSektoriAsync_ReturnsAllSectors()
    {
        // Arrange
        _testFixture.SeedSektori(_dbContext, new List<Sektor>
        {
            new Sektor { IdSektor = 1, Naziv = "Sektor 1", Povrsina = 20 },
            new Sektor { IdSektor = 2, Naziv = "Sektor 2", Povrsina = 10 }
        });

        // Act
        var result = await _sektoriRepository.GetSektoriAsync();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Sektor 1", result[0].Naziv);
        Assert.Equal("Sektor 2", result[1].Naziv);
    }

    [Fact]
    public async Task GetSektorByIdAsync_ReturnsSektorById()
    {
        // Arrange
        _testFixture.SeedSektor(_dbContext, new Sektor { IdSektor = 3, Naziv = "Sektor 3", Povrsina = 20 });

        // Act
        var result = await _sektoriRepository.GetSektorByIdAsync(3);

        // Assert
        Assert.Equal("Sektor 3", result.Naziv);
    }

    [Fact]
    public async Task CreateSektorAsync_CreatesNewSektor()
    {
        // Arrange
        var sektor = new Sektor { IdSektor = 5, Naziv = "Sektor 5", Povrsina = 20 };

        // Act
        var result = await _sektoriRepository.CreateSektorAsync(sektor);
        var createdSektor = await _dbContext.Sektor.FindAsync(result);

        // Assert
        Assert.Equal("Sektor 5", createdSektor.Naziv);
    }

    [Fact]
    public async Task UpdateSektorAsync_UpdatesSektor()
    {
        // Arrange
        _testFixture.SeedSektor(_dbContext, new Sektor { IdSektor = 6, Naziv = "Sektor 6", Povrsina = 20 });
        var sektor = await _dbContext.Sektor.FindAsync(6);

        // Act
        sektor.Naziv = "Novi naziv sektora 6";
        var result = await _sektoriRepository.UpdateSektorAsync(sektor);
        var updatedSektor = await _dbContext.Sektor.FindAsync(6);

        // Assert
        Assert.Equal("Novi naziv sektora 6", updatedSektor.Naziv);
    }

    [Fact]
    public async Task DeleteSektorAsync_DeletesSektor()
    {
        // Arrange
        _testFixture.SeedSektor(_dbContext, new Sektor { IdSektor = 7, Naziv = "Sektor 7", Povrsina = 20 });

        // Act
        var result = await _sektoriRepository.DeleteSektorAsync(7);
        var deletedSektor = await _dbContext.Sektor.FindAsync(7);

        // Assert
        Assert.Null(deletedSektor);
    }
    
    [Fact]
    public async Task GetNaziviSektora_ReturnsAllSectorsNames()
    {
        // Arrange
        _testFixture.SeedSektori(_dbContext, new List<Sektor>
        {
            new Sektor { IdSektor = 8, Naziv = "Sektor 8", Povrsina = 20 },
            new Sektor { IdSektor = 9, Naziv = "Sektor 9", Povrsina = 10 }
        });

        // Act
        var result = await _sektoriRepository.GetNaziviSektora();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Sektor 8", result[0]);
        Assert.Equal("Sektor 9", result[1]);
    }
    
}

