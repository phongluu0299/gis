using gis.DTOs.PermissionDTO;
using gis.Helpers;
using gis.Models;
using gis.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gis.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class PermissionController : Controller
    {
        private readonly PermissionService permissionService;
        public PermissionController(PermissionService permissionService)
        {
            this.permissionService = permissionService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAll([FromQuery] ParamListPermissionDTO request)
        {
            try
            {
                var data = await permissionService.GetListAsync(request);
                return Ok(
                    new Result<IEnumerable<ListPermissionDTO>>()
                    {
                        Code = StatusCodes.Status200OK,
                        Message = "",
                        Data = data
                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Result<string>
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Message = "Lỗi hệ thống",
                    Data = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            try
            {
                var data = await permissionService.GetByIdAsync(id);
                if (data == null)
                {
                    return NotFound(
                        new Result<string>()
                        {
                            Code = StatusCodes.Status404NotFound,
                            Message = "Không tìm thấy quyền",
                            Data = null
                        }
                    );
                }

                return Ok(
                    new Result<Permission>()
                    {
                        Code = StatusCodes.Status200OK,
                        Message = "",
                        Data = data
                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Result<string>
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Message = "Lỗi hệ thống",
                    Data = ex.Message
                });
            }
        }
        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] AddOrUpdPermissionDTO addPermissionDTO)
        {
            try
            {

                var id = await permissionService.AddAsync(addPermissionDTO);
                return Ok(
                    new Result<int>
                    {
                        Code = StatusCodes.Status200OK,
                        Message = "Thêm quyền thành công",
                        Data = id
                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Result<string>
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Message = "Lỗi hệ thống",
                    Data = ex.Message
                });
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] AddOrUpdPermissionDTO addPermissionDTO, int id)
        {
            try
            {
       
                var oldId = await permissionService.UpdateAsync(addPermissionDTO, id);
                if(oldId == null)
                {
                    return NotFound(new Result<string>
                    {
                        Code = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy quyền"

                    });
                }
                return Ok(
                    new Result<int?>
                    {
                        Code = StatusCodes.Status200OK,
                        Message = "Cập nhật quyền thành công",
                        Data = oldId
                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Result<string>
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Message = "Lỗi hệ thống",
                    Data = ex.Message
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var permission = await permissionService.GetByIdAsync(id);
                if (permission == null)
                {
                    return NotFound(new Result<string>
                    {
                        Code = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy quyền"
                        
                    });
                }
                int affectRow = await permissionService.Remove(permission);
             
                return Ok(new Result<string>
                {
                    Code = StatusCodes.Status200OK,
                    Message = "Xóa quyền" + ((affectRow == 0) ? "thất bại"  : " thành công"),
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Result<string>
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Message = "Lỗi hệ thống",
                    Data = ex.Message
                });
            }
        }
    }
}
