

using gis.DTOs.DongHoKhachHangDTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    public class GhiThuTheoKyByBoundDTOWithInfo
    {
        public long id { get; set; }
        public string? MaDB { get; set; }

        public string? HoTenKH { get; set; }

        public decimal? ChiSoCu { get; set; }

        public decimal? ChiSoMoi { get; set; }

        public decimal? ThanhTien { get; set; }

        public decimal? LuongTieuThu { get; set; }

        public string? TrangThaiTT { get; set; }

        public string? MaNV { get; set; }

        public string? TenNV { get; set; }
        public string? NgayGhi { get; set; }
    }
}
