using Moq;
using Xunit;
using ZOO_Management.ApplicationServices.Mappers;
using ZOO_Management.ApplicationServices.Services.Nastambe;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainServices.Interfaces.Repositories;

namespace ZOO_Management.UnitTests
{
    public class NastambeServiceTest
    {
        private Mock<INastambeRepository> _nastambeRepositoryMock;
        private Mock<IZivotinjeRepository> _zivotinjeRepositoryMock;

        private INastambeService GetMainServiceReference() => new NastambeService(_nastambeRepositoryMock.Object, _zivotinjeRepositoryMock.Object);

        private void SetupMocks()
        {
            _nastambeRepositoryMock = new Mock<INastambeRepository>();
            _zivotinjeRepositoryMock = new Mock<IZivotinjeRepository>();

            SetupRepositoryMocks();
        }

        private void SetupRepositoryMocks()
        {
            Nastamba nastambaMock = new Nastamba { IdNastamba = 1, Velicina = 101, Kapacitet = 100, Tip = "Kavez", 
                Naseljena = true, IdSektor = 2};
            List<Nastamba> listaMock = new List<Nastamba>();
            listaMock.Add(nastambaMock);
            
            List<Zivotinja> zivotinje = new List<Zivotinja>();
            zivotinje.Add(new Zivotinja { IdZivotinja = 1, IdNastamba = 1, IdVrsta = 1, Starost = 5, Kilaza = 10, Ime = "Zvijer" });


            _nastambeRepositoryMock.Setup(x => x.GetNastambeAsync()).
                ReturnsAsync(listaMock);
            _nastambeRepositoryMock.Setup(x => x.GetNastambaByIdAsync(It.IsAny<int>())).
                ReturnsAsync(nastambaMock);
            _nastambeRepositoryMock.Setup(x => x.CreateNastambaAsync(It.IsAny<Nastamba>())).
                ReturnsAsync(1);
            _nastambeRepositoryMock.Setup(x => x.UpdateNastambaAsync(It.IsAny<Nastamba>())).
                ReturnsAsync(1);
            _nastambeRepositoryMock.Setup(x => x.DeleteNastambaAsync(It.IsAny<int>())).
                ReturnsAsync(1);
            _zivotinjeRepositoryMock.Setup(x => x.GetByNastambaIdAsync(It.IsAny<int>())).
                ReturnsAsync(zivotinje);
        }

        [Fact]
        public void GetNastambeAsync_ExistingData_ReturnsNastambe()
        {
            SetupMocks();

            INastambeService service = GetMainServiceReference();

            List<NastambeGetResponse> result = service.GetNastambeAsync().GetAwaiter().GetResult();
            foreach (var nast in result)
            {
                var nastambaZivotinje = _zivotinjeRepositoryMock.Object.GetByNastambaIdAsync(nast.IdNastamba).GetAwaiter().GetResult();
                nast.Zivotinje = ZivotinjeMapper.MapZivotinjeToZivotinjeGetByNastambaIdResponse(nastambaZivotinje);
            }

            Xunit.Assert.True(result.Any());
            Xunit.Assert.NotNull(result);
        }

        [Fact]
        public void GetNastambaByIdAsync_ExistingData_ReturnsNastamba()
        {
            SetupMocks();

            INastambeService service = GetMainServiceReference();

            NastambeGetResponse result = service.GetNastambaByIdAsync(1).GetAwaiter().GetResult();
            var nastambaZivotinje = _zivotinjeRepositoryMock.Object.GetByNastambaIdAsync(1).GetAwaiter().GetResult();
            result.Zivotinje = ZivotinjeMapper.MapZivotinjeToZivotinjeGetByNastambaIdResponse(nastambaZivotinje);
            Xunit.Assert.NotNull(result);
        }

        [Fact]
        public void CreateNastambaAsync_ValidData_ReturnsId()
        {
            SetupMocks();

            INastambeService service = GetMainServiceReference();

            NastambaCreateNewRequest request = new NastambaCreateNewRequest
            {
                Velicina = 101,
                Kapacitet = 100,
                Tip = "Kavez",
                Naseljena = true,
                IdSektor = 2
            };

            int result = service.CreateNastambaAsync(request).GetAwaiter().GetResult();

            Xunit.Assert.Equal(1, result);
        }

        [Fact]
        public void UpdateNastambaAsync_ValidData_ReturnsId()
        {
            SetupMocks();

            INastambeService service = GetMainServiceReference();

            NastambaUpdateRequest request = new NastambaUpdateRequest
            {
                IdNastamba = 1,
                Velicina = 101,
                Kapacitet = 100,
                Tip = "Kavez",
                Naseljena = true,
                IdSektor = 2
            };

            int result = service.UpdateNastambaAsync(request).GetAwaiter().GetResult();

            Xunit.Assert.Equal(1, result);
        }

        [Fact]
        public void DeleteNastambaAsync_ValidData_ReturnsId()
        {
            SetupMocks();

            INastambeService service = GetMainServiceReference();

            int result = service.DeleteNastambaAsync(1).GetAwaiter().GetResult();

            Xunit.Assert.Equal(1, result);
        }
    }
}