
using System.ComponentModel.DataAnnotations;


namespace gis.Models
{
    public class Permission
    {
        public Permission()
        {
          
        }

        [Key]
        public int PermissionID { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên nhóm quyền!")]
        [StringLength(150)]
   
        public string PermissionName { get; set; }
       
        public string? Description { get; set; }
        
    }
}
