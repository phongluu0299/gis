
using gis.DTOs.PermissionDTO;
using System.ComponentModel.DataAnnotations;


namespace gis.Models
{
    public class Permission
    {
        public Permission()
        {
          
        }

        public Permission(AddOrUpdPermissionDTO req)
        {
           
            PermissionName = req.PermissionName;
            Description = req.Description;
        }

        [Key]
        public int PermissionID { get; set; }

        public string PermissionName { get; set; }
       
        public string? Description { get; set; }
        
    }
}
