using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZOO_Management.Data.Models;

namespace ZOO_Management.Controllers
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ZOO_infsusContext _ctx;
        public TestController(ZOO_infsusContext ctx) {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> TestDbAsync()
        {
            try
            {
                var res = await _ctx.Nastamba.ToListAsync();

            } catch (Exception ex)
            {
                
            }

            return Ok();
        }
    }
}
