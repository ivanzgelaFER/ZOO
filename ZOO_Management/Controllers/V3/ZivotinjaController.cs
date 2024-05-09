using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Nastambe;
using ZOO_Management.ApplicationServices.Services.Zivotinje;
using ZOO_Management.DomainModel.Models;

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

        [HttpGet("{nastambaId}/getByNastambaId")]
        public async Task<IActionResult> GetByNastambaIdAsync([FromRoute] int nastambaId)
        {
            return Ok(await _zivotinjeService.GetByNastambaIdAsync(nastambaId));
        }
    }
}
