using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;


namespace gis.Data
{
    public class LegendConfiguration : IEntityTypeConfiguration<Legend>
    {
        public void Configure(EntityTypeBuilder<Legend> builder)
        {
            builder.ToTable("Legend");

            builder.HasKey(x => x.LegendID);
        }
    }
}
