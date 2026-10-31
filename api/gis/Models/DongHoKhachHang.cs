using gis.DTOs.DongHoKhachHangDTO;
using NetTopologySuite.Geometries;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gis.Models
{
    public class DongHoKhachHang
    {
       public DongHoKhachHang()
        {

        }
        public DongHoKhachHang(AddDongHoKHDTO req)
        {
            NgayCapNhat = req.NgayCapNhat;
            MaKH = req.MaKH;
            MaDB = req.MaDB;
            TenKH = req.TenKH;
            DiaChi = req.DiaChi;
            MaLT = req.MaLT;
            TrangThaiDongHo = req.TrangThaiDongHo;
            TrangThai = req.TrangThai;
            LocationX = req.LocationX;
            LocationY = req.LocationY;
            ThoiHanSuDung = req.ThoiHanSuDung;
            NSX = req.NSX;
            NguoiCapNhat = req.NguoiCapNhat;
            DoiTuongID = req.DoiTuongID;
            LoaiDongHoID = req.LoaiDongHoID;
            HinhThucThuID = req.HinhThucThuID;
            Location = (req.LocationY >= -180 && 
                req.LocationY <= 180 && 
                req.LocationX >= -90 && 
                req.LocationX <= 90) ? new Point((double)req.LocationY, (double)req.LocationX) { SRID = 4326 } : null;
        }
        [Key]
        public long DongHoKhachHangID { get; set; }

        public string? MaKH { get; set; }

        public string? MaDB { get; set; }

        public string? TenKH { get; set; }

        public string? DiaChi { get; set; }

        public string? MaLT { get; set; }

        public string? TrangThaiDongHo { get; set; }

        [Range(-90, 90)]
        public decimal? LocationX { get; set; }
        [Range(-180, 180)]
        public decimal? LocationY { get; set; }

        /// <summary>
        /// SQL Server Geography
        /// </summary>

        public Point? Location { get; set; }

        public DateTime? ThoiHanSuDung { get; set; }

        public DateTime? NSX { get; set; }

        public string? NguoiCapNhat { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? DoiTuongID { get; set; }
        public int? LoaiDongHoID { get; set; }
        public int? HinhThucThuID { get; set; }
        public bool? TrangThai { get; set; }
    }
}