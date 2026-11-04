using gis.Helpers;
using gis.Services;

namespace gis.Extensions
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services)
        {
            services.AddScoped<JwtHelper>();

            services.AddScoped<AuthService>();
            services.AddScoped<UserService>();
            services.AddScoped<RanhGioiService>();
            services.AddScoped<LegendService>();
            services.AddScoped<PipelineService>();
            services.AddScoped<WaterSupplyStationService>();
            services.AddScoped<DongHoKhachHangService>();
            services.AddScoped<GhiThuTheoKyService>();
            return services;
        }
    }
}
