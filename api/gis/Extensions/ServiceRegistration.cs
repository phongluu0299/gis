using gis.Helpers;
using gis.Services;
//using gis.Services;

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
            return services;
        }
    }
}
