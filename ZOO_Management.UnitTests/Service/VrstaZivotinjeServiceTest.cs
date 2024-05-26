using Moq;
using Xunit;
using ZOO_Management.ApplicationServices.Services.VrstaZivotinje;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;
using ZOO_Management.DomainModel.ResponseModels.VrsteZivotinja;
using ZOO_Management.DomainServices.Interfaces.Repositories;
using Assert = Xunit.Assert;

namespace ZOO_Management.UnitTests.Service;

public class VrstaZivotinjeServiceTest
{
    private Mock<IVrstaZivotinjeRepository> _vrstaZivotinjeRepositoryMock;

    private IVrstaZivotinjeService GetMainServiceReference() => new VrstaZivotinjeService(_vrstaZivotinjeRepositoryMock.Object);
    
    private void SetupMocks()
    {
        _vrstaZivotinjeRepositoryMock = new Mock<IVrstaZivotinjeRepository>();
        SetupRepositoryMocks();
    }

    private void SetupRepositoryMocks()
    {
        VrstaZivotinje vrstaZivotinjeMock = new VrstaZivotinje { Boja = "Crna", IdVrsta = 1, Visina = 2, ZivotniVijek = 20};
        List<VrstaZivotinje> listaMock = new List<VrstaZivotinje>();
        listaMock.Add(vrstaZivotinjeMock);
        
        _vrstaZivotinjeRepositoryMock.Setup(x => x.GetVrsteZivotinjaAsync()).
            ReturnsAsync(listaMock);
        _vrstaZivotinjeRepositoryMock.Setup(x => x.GetVrstaZivotinjaByIdAsync(It.IsAny<int>())).ReturnsAsync(vrstaZivotinjeMock);
        _vrstaZivotinjeRepositoryMock.Setup(x => x.CreateVrstaZivotinjaAsync(It.IsAny<VrstaZivotinje>())).
            ReturnsAsync(1);
        _vrstaZivotinjeRepositoryMock.Setup(x => x.UpdateVrstaZivotinjaAsync(It.IsAny<VrstaZivotinje>())).ReturnsAsync(1);
        _vrstaZivotinjeRepositoryMock.Setup(x => x.DeleteVrstaZivotinjaAsync(It.IsAny<int>())).ReturnsAsync(1);
        _vrstaZivotinjeRepositoryMock.Setup(x => x.GetZivotniVijekVrsteZivotinje(It.IsAny<int>())).ReturnsAsync(20);
    }
    
    [Fact]
    public async void GetVrsteZivotinjaAsync_ExistingData_ReturnsVrsteZivotinja()
    {
        SetupMocks();

        IVrstaZivotinjeService service = GetMainServiceReference();

        List<VrstaZivotinjeGetResponse> result = await service.GetVrsteZivotinjeAsync();
        
        foreach (var vrsta in result)
        {
            Assert.Equal("Crna", vrsta.Boja);
            Assert.Equal(1, vrsta.IdVrsta);
            Assert.Equal(2, vrsta.Visina);
            Assert.Equal(20, vrsta.ZivotniVijek);
        }
    }
    
    [Fact]
    public async void GetVrstaZivotinjeByIdAsync_ExistingData_ReturnsVrstaZivotinje()
    {
        SetupMocks();

        IVrstaZivotinjeService service = GetMainServiceReference();

        VrstaZivotinjeGetResponse result = await service.GetVrstaZivotinjeByIdAsync(1);
        
        Assert.Equal("Crna", result.Boja);
        Assert.Equal(1, result.IdVrsta);
        Assert.Equal(2, result.Visina);
        Assert.Equal(20, result.ZivotniVijek);
    }
    
    [Fact]
    public async void CreateVrstaZivotinjeAsync_ExistingData_ReturnsVrstaZivotinje()
    {
        SetupMocks();

        IVrstaZivotinjeService service = GetMainServiceReference();

        VrstaZivotinjeCreateNewRequest request = new VrstaZivotinjeCreateNewRequest { Boja = "Crna", Visina = 2, ZivotniVijek = 20};
        int result = await service.CreateVrstaZivotinjeAsync(request);
        
        Assert.Equal(1, result);
    }
    
    [Fact]
    public async void UpdateVrstaZivotinjeAsync_ExistingData_ReturnsVrstaZivotinje()
    {
        SetupMocks();

        IVrstaZivotinjeService service = GetMainServiceReference();

        VrstaZivotinjeUpdateRequest request = new VrstaZivotinjeUpdateRequest { IdVrsta = 1, Boja = "Plava", Visina = 5, ZivotniVijek = 20};
        int result = await service.UpdateVrstaZivotinjeAsync(request);
        
        Assert.Equal(1, result);
    }
    
    [Fact]
    public async void DeleteVrstaZivotinjeAsync_ExistingData_ReturnsVrstaZivotinje()
    {
        SetupMocks();

        IVrstaZivotinjeService service = GetMainServiceReference();

        int result = await service.DeleteVrstaZivotinjeAsync(1);
        
        Assert.Equal(1, result);
    }
    
}