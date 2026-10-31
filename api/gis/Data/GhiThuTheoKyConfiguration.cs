using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace gis.Data
{
    public class GhiThuTheoKyConfiguration : IEntityTypeConfiguration<GhiThuTheoKy>
    {
        public void Configure(EntityTypeBuilder<GhiThuTheoKy> builder)
        {
            builder.ToTable("GhiThuTheoKy");

            builder.HasKey(x => x.GhiThuID);
        }
    }
}
