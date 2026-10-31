using gis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace gis.Data { 
    public class PermissionUserConfiguration : IEntityTypeConfiguration<PermissionUser>
    {
        public void Configure(EntityTypeBuilder<PermissionUser> builder)
        {
            builder.ToTable("PermissionUsers");

            builder.HasKey(x => x.ID);
        }
    }
}
