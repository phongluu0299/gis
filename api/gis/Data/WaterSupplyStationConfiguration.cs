using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace gis.Data
{
    public class WaterSupplyStationConfiguration : IEntityTypeConfiguration<WaterSupplyStation>
    {
        public void Configure(EntityTypeBuilder<WaterSupplyStation> builder)
        {
            builder.ToTable("geo_WaterSupplyStation");
            builder.HasKey(x => x.WaterSupplyStationID);
            builder.Property(x => x.Geometry).HasColumnType("geometry");
            builder.Property(x => x.MaHieu).HasColumnName("MA_HIEU");
            builder.Property(x => x.TenNvql).HasColumnName("TEN_NVQL");
            builder.Property(x => x.DienTich).HasColumnName("DIEN_TICH_");
            builder.Property(x => x.NguonGoc).HasColumnName("NGUON_GOC_");
            builder.Property(x => x.GiayHien).HasColumnName("GIAY_HIEN_");
            builder.Property(x => x.GiayPhep).HasColumnName("GIAY_PHEP_");
            builder.Property(x => x.NgayCap).HasColumnName("NGAY_CAP");
            builder.Property(x => x.ChatLuong).HasColumnName("CHAT_LUONG");
            builder.Property(x => x.KetCauGi).HasColumnName("KET_CAU_GI");
            builder.Property(x => x.TinhHinh).HasColumnName("TINH_HINH_");
            builder.Property(x => x.KhaNangM).HasColumnName("KHA_NANG_M");
            builder.Property(x => x.ObjectId).HasColumnName("OBJECTID");
            builder.Property(x => x.CsThietK).HasColumnName("CS_THIET_K");
            builder.Property(x => x.KhaNangP).HasColumnName("KHA_NANG_P");
            builder.Property(x => x.SoHoTren).HasColumnName("SO_HO_TREN");
            builder.Property(x => x.SoHoSuD).HasColumnName("SO_HO_SU_D");
            builder.Property(x => x.DoSauGie).HasColumnName("DO_SAU_GIE");
            builder.Property(x => x.TongChieu).HasColumnName("TONG_CHIEU");
            builder.Property(x => x.D34).HasColumnName("D34");
            builder.Property(x => x.D42).HasColumnName("D42");
            builder.Property(x => x.D49).HasColumnName("D49");
            builder.Property(x => x.D60).HasColumnName("D60");
            builder.Property(x => x.D75).HasColumnName("D75");
            builder.Property(x => x.D90).HasColumnName("D90");
            builder.Property(x => x.D114).HasColumnName("D114");
            builder.Property(x => x.D168).HasColumnName("D168");
            builder.Property(x => x.ChieuDai).HasColumnName("CHIEU_DAI");
            builder.Property(x => x.SoHoTang).HasColumnName("SO_HO_TANG");
            builder.Property(x => x.DuongKinh).HasColumnName("DUONG_KINH");
            builder.Property(x => x.LuuLuong).HasColumnName("LUU_LUONG_");
            builder.Property(x => x.MucNuocT).HasColumnName("MUC_NUOC_T");
        }
    }
}
