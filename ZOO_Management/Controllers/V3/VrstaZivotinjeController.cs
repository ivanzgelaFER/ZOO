using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.VrstaZivotinje;
using ZOO_Management.DomainModel.RequestModels.VrsteZivotinja;

namespace ZOO_Management.Controllers.V3
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class VrstaZivotinjeController : Controller
    {
        public readonly IVrstaZivotinjeService _vrstaZivotinjeService;

        public VrstaZivotinjeController(IVrstaZivotinjeService vrstaZivotinjeService)
        {
            _vrstaZivotinjeService = vrstaZivotinjeService;
        }
        
        [HttpGet("options")]
        public async Task<IActionResult> getVrsteZivotinjaOptions()
        {
            return Ok(await _vrstaZivotinjeService.getVrsteZivotinjaOptions());
        }
        
        [HttpGet]
        public async Task<IActionResult> GetVrsteZivotinjaAsync()
        {
            return Ok(await _vrstaZivotinjeService.GetVrsteZivotinjeAsync());
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVrstaZivotinjeAsync([FromRoute] int id)
        {
            return Ok(await _vrstaZivotinjeService.GetVrstaZivotinjeByIdAsync(id));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateVrstaZivotinjeAsync([FromBody] VrstaZivotinjeCreateNewRequest request)
        {
            return Ok(await _vrstaZivotinjeService.CreateVrstaZivotinjeAsync(request));
        }
            
        [HttpPut]
        public async Task<IActionResult> UpdateVrstaZivotinjeAsync([FromBody] VrstaZivotinjeUpdateRequest request)
        {
            return Ok(await _vrstaZivotinjeService.UpdateVrstaZivotinjeAsync(request));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVrstaZivotinje([FromRoute] int id)
        {
            return Ok(await _vrstaZivotinjeService.DeleteVrstaZivotinjeAsync(id));
        }
    }
}
