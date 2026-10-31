using gis.Helpers;
using gis.Repositories;
//using gis.Repositories;

namespace gis.Extensions
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddRepositories(
            this IServiceCollection services)
        {
            services.AddScoped<UnitOfWork>();

            services.AddScoped<AuthRepository>();
            services.AddScoped<UserRepository>();
           
            services.AddScoped<RanhGioiRepository>();
            return services;
        }
    }
}
