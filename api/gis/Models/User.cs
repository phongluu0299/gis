using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace gis.Models
{
    public class User
    {
        public User()
        {
        }

        public int UserID { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập mã người dùng!")]
        [StringLength(50)]
        public string EmplID { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ tên!")]
        [StringLength(150)]
        public string FullName { get; set; }
     
        public int? Sex { get; set; } 
      
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? BirthDay { get; set; }
     
        public string? Address { get; set; }
       
        public string? Email { get; set; }

        [StringLength(50)]
        public string? Phone { get; set; }

        public string? RandomCode { get; set; } = null;

        public string? Avatar { get; set; } = null;

        public bool Active { get; set; } = false;

        [Required(ErrorMessage = "Vui lòng nhập tên đăng nhập")]
        [StringLength(50)]
        public string UserName { get; set; }


        public string? Password { get; set; } = null;

        public int? CountLogin { get; set; } = 0;

        public bool IsAdmin { get; set; } = false;
        public bool? IsThirdParty { get; set; } = false;

    }
}
