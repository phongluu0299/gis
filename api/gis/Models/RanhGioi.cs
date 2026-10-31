using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace gis.Models
{

    public class RanhGioi
    {
        [Key]
        public int RanhGioiID { get; set; }

        public string MaXa { get; set; } = "";

        public string TenXa { get; set; } = "";

        public string? SapNhap { get; set; }

        public string? TruSo { get; set; }

        public string Loai { get; set; } = "";

        public int Cap { get; set; }

        public int Stt { get; set; }

        public double DienTichKm2 { get; set; }

        public int DanSo { get; set; }

        public double MatDoKm2 { get; set; }

        public string MaTinh { get; set; } = "";

        public string TenTinh { get; set; } = "";

        public MultiPolygon Geometry { get; set; } = null!;
    }
}
