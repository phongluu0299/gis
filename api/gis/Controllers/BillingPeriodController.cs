using gis.DTOs.DongHoKhachHangDTO;
using gis.DTOs.GhiThuTheoKyDTO;
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
    public class BillingPeriodController : ControllerBase
    {
        private readonly GhiThuTheoKyService ghiThuTheoKyService;
        public BillingPeriodController(GhiThuTheoKyService ghiThuTheoKyService)
        {
            this.ghiThuTheoKyService = ghiThuTheoKyService;
        }
        [HttpGet("by-bound")]
        public async Task<IActionResult> GetByBound([FromQuery] ParamGTTKByBoundDTO request)
        {
            var data = await ghiThuTheoKyService.GetByBound(request);
            return Ok(
                new Result<IEnumerable<GhiThuTheoKyByBoundDTO>>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = data
                }
                );
        } 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInfo(long id )
        {
            var data = await ghiThuTheoKyService.GetInfoByIdAsync(id);
            return Ok(
                new Result<GhiThuTheoKyByBoundDTOWithInfo>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = data
                }
            );
        }
    }
}
