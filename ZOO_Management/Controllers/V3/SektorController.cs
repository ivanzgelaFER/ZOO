using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Sektori;
using ZOO_Management.DomainModel.RequestModels.Sektori;

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

        [HttpGet]
        public async Task<IActionResult> GetSektorsAsync()
        {
            return Ok(await _sektorService.GetSektoriAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSektorAsync([FromRoute] int id)
        {
            return Ok(await _sektorService.GetSektorByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSektorAsync([FromBody] SektorCreateNewRequest request)
        {
            return Ok(await _sektorService.CreateSektorAsync(request));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSektorAsync([FromBody] SektorUpdateRequest request)
        {
            return Ok(await _sektorService.UpdateSektorAsync(request));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobTitle([FromRoute] int id)
        {
            return Ok(await _sektorService.DeleteSektorAsync(id));
        }
        
        [HttpGet("nazivi")]
        public async Task<IActionResult> GetNaziviSektora()
        {
            return Ok(await _sektorService.GetNaziviSektora());
        }
    }
}
