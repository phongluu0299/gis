
namespace gis.DTOs.DongHoKhachHangDTO
{
    public class DongHoKHByBoundDTO
    {
        public long ID { get; set; }
        public decimal? LocationX { get; set; }
        public decimal? LocationY { get; set; }
    }
    
    public class ParamDHKHByBoundDTO
    {
        public double north { get; set; }
        public double south { get; set; }
        public double east { get; set; }
        public double west { get; set; }
    
    }
}
