using Org.BouncyCastle.Asn1.Crmf;
using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels;
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

        public static Nastamba MapNastambaCreateNewRequestToNastamba(NastambaCreateNewRequest request)
        {
            return new Nastamba
            {
                Velicina = request.Velicina,
                Kapacitet = request.Kapacitet,
                Tip = request.Tip,
                Naseljena = request.Naseljena,
                IdSektor = request.IdSektor,
            };
        }

        public static Nastamba MapNastambaUpdateRequestToNastamba(NastambaUpdateRequest request)
        {
            return new Nastamba
            {
                IdNastamba = request.IdNastamba,
                Velicina = request.Velicina,
                Kapacitet = request.Kapacitet,
                Tip = request.Tip,
                Naseljena = request.Naseljena,
                IdSektor = request.IdSektor,
            };
        }

        public static NastambeGetResponse MapNastambaToNastambeGetResponse(Nastamba nastamba)
        {
            return new NastambeGetResponse
            {
                IdNastamba = nastamba.IdNastamba,
                Velicina = nastamba.Velicina,
                Kapacitet = nastamba.Kapacitet,
                Naseljena = nastamba.Naseljena,
                Tip = nastamba.Tip,
                IdSektor = nastamba.IdSektor,
            };
        }

        public static List<DropdownItemsListResponse> MapNastambeToDropdownItemsListResponse(List<Nastamba> nastambe)
        {
            List<DropdownItemsListResponse> response = new List<DropdownItemsListResponse>();

            foreach (var n in nastambe)
            {
                response.Add(new DropdownItemsListResponse()
                {
                    Label = n.Tip,
                    Value = n.IdNastamba
                });
            }

            return response;
        }
    }
}
