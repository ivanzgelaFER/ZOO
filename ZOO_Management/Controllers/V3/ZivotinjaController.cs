using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Zivotinje;
using ZOO_Management.DomainModel.RequestModels.Nastambe;
using ZOO_Management.DomainModel.RequestModels.Zivotinje;
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
        
        //TODO: GetByNastambaIdAsync ?
        
        [HttpGet]
        public async Task<IActionResult> GetZivotinjeAsync()
        {
            return Ok(await _zivotinjeService.GetZivotinjeAsync());
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetZivotinjeAsync([FromRoute] int id)
        {
            return Ok(await _zivotinjeService.GetZivotinjaByIdAsync(id));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateZivotinjaAsync([FromBody] ZivotinjaCreateNewRequest request)
        {
            return Ok(await _zivotinjeService.CreateZivotinjaAsync(request));
        }
            
        [HttpPut]
        public async Task<IActionResult> UpdateNastambaAsync([FromBody] ZivotinjaUpdateRequest request)
        {
            return Ok(await _zivotinjeService.UpdateZivotinjaAsync(request));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZivotinja([FromRoute] int id)
        {
            return Ok(await _zivotinjeService.DeleteZivotinjaAsync(id));
        }   
    }
}
