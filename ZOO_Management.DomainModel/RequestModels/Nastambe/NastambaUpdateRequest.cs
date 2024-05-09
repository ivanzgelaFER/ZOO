namespace ZOO_Management.DomainModel.RequestModels.Nastambe
{
    public class NastambaUpdateRequest
    {
        public int IdNastamba { get; set; }

        public int? Velicina { get; set; }

        public int? Kapacitet { get; set; }

        public string? Tip { get; set; }

        public bool? Naseljena { get; set; }

        public int? IdSektor { get; set; }
    }
}
