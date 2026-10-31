using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;


namespace gis.Data
{
    public class RanhGioiConfiguration : IEntityTypeConfiguration<RanhGioi>
    {
        public void Configure(EntityTypeBuilder<RanhGioi> builder)
        {
            builder.ToTable("geo_RanhGioi");

            builder.HasKey(x => x.RanhGioiID);
            builder.Property(x => x.Geometry).HasColumnType("geometry");
        }
    }
}
