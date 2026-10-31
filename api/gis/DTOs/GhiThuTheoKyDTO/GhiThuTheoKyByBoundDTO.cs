

using gis.DTOs.DongHoKhachHangDTO;

namespace gis.DTOs.GhiThuTheoKyDTO
{
    public class GhiThuTheoKyByBoundDTO : DongHoKHByBoundDTO
    {
       
    }
    
    public class ParamGTTKByBoundDTO : ParamDHKHByBoundDTO
    {
        public int month { get; set; }
        public int year { get; set; }
    }
}
