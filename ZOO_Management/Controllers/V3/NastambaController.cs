using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZOO_Management.ApplicationServices.Services.Nastambe;
using ZOO_Management.DomainModel.RequestModels.Nastambe;

namespace ZOO_Management.Controllers.V3
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class NastambaController : ControllerBase
    {
        public readonly INastambeService _nastambeService;

        public NastambaController(INastambeService nastambaService)
        {
            _nastambeService = nastambaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNastambeAsync()
        {
            return Ok(await _nastambeService.GetNastambeAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNastambaAsync([FromBody] NastambaCreateNewRequest dto)
        {
            var rez = dto;
            return Ok();
        }
    }
}
