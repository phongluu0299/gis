using gis.Helpers;
using gis.Models;
using gis.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gis.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class LegendController : Controller
    {
        private readonly LegendService legendService;
        public LegendController(LegendService legendService)
        {
            this.legendService = legendService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var data = await legendService.GetAllAsync();
            return Ok(
                new Result<IEnumerable<Legend>>()
                {
                    Code = StatusCodes.Status200OK,
                    Message = "",
                    Data = data
                }
            );
        }
    }
}
