namespace gis.DTOs.PermissionDTO
{
    public class ParamListPermissionDTO
    {
        public string? PermissionName { get; set; }
    }

    public class ListPermissionDTO
    {
        public int PermissionID { get; set; }
        public string PermissionName { get; set; }
        public string? Description { get; set; }
    }
}