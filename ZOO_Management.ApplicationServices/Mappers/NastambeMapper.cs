using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;

namespace ZOO_Management.ApplicationServices.Mappers
{
    public class NastambeMapper
    {
        public static List<NastambeGetResponse> MapNastambeToNastambeGetResponse(List<Nastamba> nastambe)
        {
            List<NastambeGetResponse> nastambeGetResponses = new List<NastambeGetResponse>();

            foreach (var n in nastambe)
            {
                nastambeGetResponses.Add(new NastambeGetResponse()
                {
                    IdNastamba = n.IdNastamba,
                    Velicina = n.Velicina,
                    Kapacitet = n.Kapacitet,
                    Naseljena = n.Naseljena,
                    Tip = n.Tip,
                    IdSektor = n.IdSektor,
                });
            }

            return nastambeGetResponses;
        }
    }
}
