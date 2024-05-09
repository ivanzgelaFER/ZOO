using Microsoft.AspNetCore.Mvc;

namespace ZOO_Management.Controllers.V3
{
    [ApiController]
    [ApiVersion("3.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class SektorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
