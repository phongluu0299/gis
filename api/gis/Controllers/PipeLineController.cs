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
    public class PipeLineController : ControllerBase
    {
        private readonly PipelineService pipelineService;
        public PipeLineController(PipelineService pipelineService)
        {
            this.pipelineService = pipelineService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GellAll()
        {
            var data = await pipelineService.GetAllAsync();
            return Ok(
                new Result<IEnumerable<Pipeline>>() 
                { 
                    Code = StatusCodes.Status200OK, 
                    Message = "", 
                    Data = data
                }
                );
        }
    }
}
