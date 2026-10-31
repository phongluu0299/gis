

using gis.Models;

namespace gis.DTOs.PageDTO
{
    public class MenuPageDTO
    {
        public string? Avatar { get; set; }
        public string UserName { get; set; }
        public string? AreaActive { get; set; }
        public string ControllerActive { get; set; }
        public string ActionActive { get; set; }
        public IEnumerable<Page>? Pages { get; set; }
    }
}
