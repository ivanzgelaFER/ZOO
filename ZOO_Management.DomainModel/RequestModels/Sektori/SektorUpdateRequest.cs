namespace ZOO_Management.DomainModel.RequestModels.Sektori
{
    public class SektorUpdateRequest
    {
        public int IdSektor { get; set; }

        public int? Povrsina { get; set; }

        public string Naziv { get; set; }
    }
}
