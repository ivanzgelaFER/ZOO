using ZOO_Management.DomainModel.Models;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.RequestModels.Sektori;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Sektori;

namespace ZOO_Management.ApplicationServices.Mappers
{
    public class SektoriMapper
    {
        public static List<SektorGetResponse> MapSektoriToSektorGetResponse(List<Sektor> sektori)
        {
            List<SektorGetResponse> sektoriGetResponses = new List<SektorGetResponse>();

            foreach (var s in sektori)
            {
                sektoriGetResponses.Add(new SektorGetResponse()
                {
                    IdSektor = s.IdSektor,
                    Naziv = s.Naziv,
                    Povrsina = s.Povrsina,
                });
            }

            return sektoriGetResponses;
        }

        public static Sektor MapSektorCreateNewRequestToSektor(SektorCreateNewRequest request)
        {
            return new Sektor
            {
                Naziv = request.Naziv,
                Povrsina = request.Povrsina,
            };
        }

        public static Sektor MapSektoraUpdateRequestToSektor(SektorUpdateRequest request)
        {
            return new Sektor
            {
                IdSektor = request.IdSektor,
                Naziv = request.Naziv,
                Povrsina = request.Povrsina,
            };
        }

        public static SektorGetResponse MapSektorToSektorGetResponse(Sektor nastamba)
        {
            return new SektorGetResponse
            {
                IdSektor = nastamba.IdSektor,
                Naziv = nastamba.Naziv,
                Povrsina = nastamba.Povrsina,
            };
        }
    }
}
