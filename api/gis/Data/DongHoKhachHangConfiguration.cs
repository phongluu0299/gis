
using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace gis.Data
{
    public class DongHoKhachHangConfiguration : IEntityTypeConfiguration<DongHoKhachHang>
    {
        public void Configure(EntityTypeBuilder<DongHoKhachHang> builder)
        {
            builder.ToTable("DongHoKhachHang");

            builder.HasKey(x => x.DongHoKhachHangID);
        }
    }
}
