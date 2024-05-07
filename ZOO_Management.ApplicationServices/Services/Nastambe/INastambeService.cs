using ZOO_Management.DomainModel.ResponseModels.Nastambe;

namespace ZOO_Management.ApplicationServices.Services.Nastambe
{
    public interface INastambeService
    {
        /// <summary>
        /// Vraca popis svih nastambi u zooloskom vrtu
        /// </summary>
        /// <returns></returns>
        Task<List<NastambeGetResponse>> GetNastambeAsync();
    }
}
