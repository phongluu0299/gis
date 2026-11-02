using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace gis.Models
{
    public class Pipeline
    {
        [Key]
        public int PipelineID { get; set; }

        public string MaHieu { get; set; } = "";

        public string TenNvql { get; set; } = "";

        public string DienTich { get; set; } = "";

        public string NguonGoc { get; set; } = "";

        public string GiayHien { get; set; } = "";

        public string GiayPhep { get; set; } = "";

        public string NgayCap { get; set; } = "";

        public string ChatLuong { get; set; } = "";

        public string KetCauGi { get; set; } = "";

        public string TinhHinh { get; set; } = "";

        public string KhaNangM { get; set; } = "";

        public string Loai { get; set; } = "";

        public string TextTinh { get; set; } = "";

        public int ObjectId { get; set; }

        public int CsThietK { get; set; }

        public int KhaNangP { get; set; }

        public int SoHoTren { get; set; }

        public int SoHoSuD { get; set; }

        public int DoSauGie { get; set; }

        public int TongChieu { get; set; }

        public int D34 { get; set; }

        public int D42 { get; set; }

        public int D49 { get; set; }

        public int D60 { get; set; }

        public int D75 { get; set; }

        public int D90 { get; set; }

        public int D114 { get; set; }

        public int D168 { get; set; }

        public int ChieuDai { get; set; }

        public int SoHoTang { get; set; }

        public int DuongKinh { get; set; }

        public double LuuLuong { get; set; }

        public double MucNuocT { get; set; }

        public double ShapeLength { get; set; }

        public MultiLineString Geometry { get; set; } = null!;
    }
}
