using System.ComponentModel.DataAnnotations;

namespace gis.DTOs.UserDTO
{
    public class LoginRequest
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
