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
    public class RanhGioiController : ControllerBase
    {
        private readonly RanhGioiService ranhGioiService;
        public RanhGioiController (RanhGioiService ranhGioiService)
        {
            this.ranhGioiService = ranhGioiService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GellAll()
        {
            return Ok(
                new Result<IEnumerable<RanhGioi>>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = await ranhGioiService.GetAllAsync() 
                }
                );
        }
    }
}
