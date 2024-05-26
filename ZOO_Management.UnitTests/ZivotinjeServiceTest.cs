using Moq;
using ZOO_Management.ApplicationServices.Services.Zivotinje;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.UnitTests;

public class ZivotinjeServiceTest
{
    private Mock<IZivotinjeRepository> _zivotinjeRepositoryMock;
    
    private IZivotinjeService GetMainServiceReference() => new ZivotinjeService(_zivotinjeRepositoryMock.Object);
    
    private void SetupMocks()
    {
        _zivotinjeRepositoryMock = new Mock<IZivotinjeRepository>();
        
        SetupRepositoryMocks();
    }

    private void SetupRepositoryMocks()
    {
        
    }
}