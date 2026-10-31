using System.ComponentModel.DataAnnotations;

namespace gis.DTOs.UserDTO
{
    public class LogInViewModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me")]
        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }

    }
}
