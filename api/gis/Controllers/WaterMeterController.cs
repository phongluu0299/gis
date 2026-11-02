using gis.DTOs.DongHoKhachHangDTO;
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
    public class WaterMeterController : ControllerBase
    {
        private readonly DongHoKhachHangService dongHoKhachHangService;
        public WaterMeterController(DongHoKhachHangService dongHoKhachHangService)
        {
            this.dongHoKhachHangService = dongHoKhachHangService;
        }
        [HttpGet("by-bound")]
        public async Task<IActionResult> GetByBound([FromQuery] ParamDHKHByBoundDTO request)
        {
            var data = await dongHoKhachHangService.GetByBound(request);
            return Ok(
                new Result<IEnumerable<DongHoKHByBoundDTO>>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = data
                }
                );
        } 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByBound(long id )
        {
            var data = await dongHoKhachHangService.GetByIdAsync(id);
            return Ok(
                new Result<DongHoKhachHang>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = data
                }
                );
        }
    }
}
