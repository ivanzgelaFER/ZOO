using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Zivotinje;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Zivotinje;

namespace ZOO_Management.Controllers.V3
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ZivotinjaController : Controller
    {
        public readonly IZivotinjeService _zivotinjeService;

        public ZivotinjaController(IZivotinjeService zivotinjeService)
        {
            _zivotinjeService = zivotinjeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetZivotinjeAsync()
        {
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNastambaAsync([FromBody] ZivotinjaUpdateRequest request)
        {
            return Ok(_zivotinjeService.UpdateZivotinjaAsync(request));
        }
    }
}
