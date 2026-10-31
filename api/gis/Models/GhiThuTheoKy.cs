using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using gis.DTOs.GhiThuTheoKyDTO;
using NetTopologySuite.Geometries;

namespace gis.Models 
{
    public class GhiThuTheoKy
    {
        public GhiThuTheoKy() { }
        public GhiThuTheoKy(AddGhiThuDTO req) 
        {
            MaDB = req.MaDB;
            HoTenKH = req.HoTenKH;  
            ChiSoCu = req.ChiSoCu;
            ChiSoMoi = req.ChiSoMoi;
            ThanhTien = req.ThanhTien;
            LuongTieuThu = req.LuongTieuThu;
            TrangThaiTT = req.TrangThaiTT;
            MaNV = req.MaNV;
            TenNV = req.TenNV;
            LocationX = req.LocationX;
            LocationY = req.LocationY;
            NgayGhi = req.NgayGhi;
            Location = (req.LocationY >= -180 &&
                req.LocationY <= 180 &&
                req.LocationX >= -90 &&
                req.LocationX <= 90) ? new Point((double)req.LocationY, (double)req.LocationX) { SRID = 4326 } : null;
        }
        [Key]
        public long GhiThuID { get; set; }

        [StringLength(50)]
        public string? MaDB { get; set; }

        [StringLength(500)]
        public string? HoTenKH { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? ChiSoCu { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? ChiSoMoi { get; set; }

        [Column(TypeName = "numeric(18,4)")]
        public decimal? ThanhTien { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? LuongTieuThu { get; set; }

        [StringLength(255)]
        public string? TrangThaiTT { get; set; }

        [StringLength(50)]
        public string? MaNV { get; set; }

        [StringLength(100)]
        public string? TenNV { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        [Range(-90, 90)]
        public decimal? LocationX { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        [Range(-180, 180)]
        public decimal? LocationY { get; set; }

        [Column(TypeName = "geography")]
        public Point? Location { get; set; }

        public DateTime? NgayGhi { get; set; }
    }
}
