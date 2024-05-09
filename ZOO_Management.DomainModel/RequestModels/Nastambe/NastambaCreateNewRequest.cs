namespace ZOO_Management.DomainModel.RequestModels.Nastambe
{
    public class NastambaCreateNewRequest
    {
        public int? Velicina { get; set; }

        public int? Kapacitet { get; set; }

        public string Tip { get; set; }

        public bool? Naseljena { get; set; }
    }
}
