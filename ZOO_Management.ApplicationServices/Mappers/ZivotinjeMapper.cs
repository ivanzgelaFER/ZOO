using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.RequestModels.Zivotinje;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Zivotinje;

namespace ZOO_Management.ApplicationServices.Mappers
{
    public class ZivotinjeMapper
    {
        public static List<ZivotinjeGetByNastambaIdResponse> MapZivotinjeToZivotinjeGetByNastambaIdResponse(List<Zivotinja> zivotinje)
        {
            List<ZivotinjeGetByNastambaIdResponse> zivotinjeGetByNastambaIdResponse = new List<ZivotinjeGetByNastambaIdResponse>();

            foreach (var z in zivotinje)
            {
                zivotinjeGetByNastambaIdResponse.Add(new ZivotinjeGetByNastambaIdResponse()
                {
                    IdZivotinja = z.IdZivotinja,
                    IdNastamba = z.IdNastamba,
                    IdVrsta = z.IdVrsta,
                    Starost = z.Starost,
                    Kilaza = z.Kilaza,
                    Ime = z.Ime
                });
            }

            return zivotinjeGetByNastambaIdResponse;
        }
        public static Zivotinja MapZivotinjaUpdateRequestToZivotinja(ZivotinjaUpdateRequest request)
        {
            return new Zivotinja
            {
                IdZivotinja = request.IdZivotinja,
                IdNastamba = request.IdNastamba,
                IdVrsta = request.IdVrsta,
                Starost = request.Starost,
                Kilaza = request.Kilaza,
                Ime = request.Ime
            };

        }
        
        public static List<ZivotinjeGetResponse> MapZivotinjeToZivotinjeGetResponse(List<Zivotinja> zivotinje)
        {
            List<ZivotinjeGetResponse> zivotinjeGetResponse = new List<ZivotinjeGetResponse>();

            foreach (var z in zivotinje)
            {
                zivotinjeGetResponse.Add(new ZivotinjeGetResponse()
                {
                    IdZivotinja = z.IdZivotinja,
                    IdNastamba = z.IdNastamba,
                    IdVrsta = z.IdVrsta,
                    Starost = z.Starost,
                    Kilaza = z.Kilaza,
                    Ime = z.Ime,
                    Kapacitet = z.Kapacitet
                });
            }

            return zivotinjeGetResponse;
        }
        
        public static ZivotinjeGetResponse MapZivotinjaToZivotinjeGetResponse(Zivotinja zivotinja)
        {
            return new ZivotinjeGetResponse()
            {
                IdZivotinja = zivotinja.IdZivotinja,
                IdNastamba = zivotinja.IdNastamba,
                IdVrsta = zivotinja.IdVrsta,
                Starost = zivotinja.Starost,
                Kilaza = zivotinja.Kilaza,
                Ime = zivotinja.Ime,
                Kapacitet = zivotinja.Kapacitet
            };
        }
        
        public static Zivotinja MapZivotinjaCreateNewRequestToZivotinja(ZivotinjaCreateNewRequest request)
        {
            return new Zivotinja
            {
                IdNastamba = request.IdNastamba,
                IdVrsta = request.IdVrsta,
                Starost = request.Starost,
                Kilaza = request.Kilaza,
                Ime = request.Ime,
                Kapacitet = request.Kapacitet
            };
        }
    }
}