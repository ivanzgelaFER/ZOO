using ZOO_Management.DomainModel.Models;
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
    }
}
