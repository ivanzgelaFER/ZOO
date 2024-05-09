using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Sektori;

namespace ZOO_Management.Controllers.V3
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class SektorController : Controller
    {
        public readonly ISektorService _sektorService;

        public SektorController(ISektorService sektorService)
        {
            _sektorService = sektorService;
        }

        [HttpGet("options")]
        public async Task<IActionResult> getSektoriOptions()
        {
            return Ok(await _sektorService.getSektoriOptions());
            
        }
    }
}
