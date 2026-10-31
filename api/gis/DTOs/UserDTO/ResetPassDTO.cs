
using System.ComponentModel.DataAnnotations;

namespace gis.DTOs.UserDTO
{
    public class ResetPassDTO
    {
        public int UserID { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu mới")]
        public string Password { get; set; }
    }
}
