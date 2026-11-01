
using gis.Models;
using Microsoft.EntityFrameworkCore;


namespace gis.Data
{
    public class AppDbContext : DbContext
    {


        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PermissionUser> PermissionUsers { get; set; }
        public DbSet<PermissionPage> PermissionPages { get; set; }
        public DbSet<DongHoKhachHang> DongHoKhachHangs { get; set; }
        public DbSet<RanhGioi> RanhGiois { get; set; }
        public DbSet<GhiThuTheoKy> GhiThuTheoKys { get; set; }
        public DbSet<Legend> Legends { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PermissionConfiguration());
            modelBuilder.ApplyConfiguration(new PermissionUserConfiguration());
            modelBuilder.ApplyConfiguration(new PermissionPageConfiguration());
            modelBuilder.ApplyConfiguration(new DongHoKhachHangConfiguration());
            modelBuilder.ApplyConfiguration(new RanhGioiConfiguration());
            modelBuilder.ApplyConfiguration(new GhiThuTheoKyConfiguration());
            modelBuilder.ApplyConfiguration(new LegendConfiguration());
        }
    }
}
