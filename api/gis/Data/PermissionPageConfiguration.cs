using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace gis.Data
{
    public class PermissionPageConfiguration : IEntityTypeConfiguration<PermissionPage>
    {
        public void Configure(EntityTypeBuilder<PermissionPage> builder)
        {
            builder.ToTable("PermissionPages");

            builder.HasKey(x => x.ID);
        }
    }
}
