
namespace gis.Models
{
    public class PermissionUser
    {
        public int ID { get; set; }

        public int PermissionID { get; set; }

        public int UserID { get; set; }

        public virtual Permission Permission { get; set; }

        public virtual User User { get; set; }
    }
}
