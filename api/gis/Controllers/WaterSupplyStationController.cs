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
    public class WaterSupplyStationController : ControllerBase
    {
        private readonly WaterSupplyStationService waterSupplyStationService;

        public WaterSupplyStationController(WaterSupplyStationService waterSupplyStationService)
        {
            this.waterSupplyStationService = waterSupplyStationService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(new Result<IEnumerable<WaterSupplyStation>>
            {
                Code = StatusCodes.Status200OK,
                Message = "",
                Data = await waterSupplyStationService.GetAllAsync()
            });
        }
    }
}
