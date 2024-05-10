using ZOO_Management.DomainModel.ResponseModels.Zivotinje;

namespace ZOO_Management.DomainModel.ResponseModels.Nastambe
{
    public class NastambeGetResponse
    {
        public int IdNastamba { get; set; }

        public int? Velicina { get; set; }

        public int? Kapacitet { get; set; }

        public string Tip { get; set; }

        public bool? Naseljena { get; set; }

        public int? IdSektor { get; set; }

        public List<ZivotinjeGetByNastambaIdResponse> Zivotinje { get; set; }
    }
}
