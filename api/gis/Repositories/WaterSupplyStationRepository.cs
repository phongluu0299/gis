using gis.Data;
using gis.Models;

namespace gis.Repositories
{
    public class WaterSupplyStationRepository : Repository<WaterSupplyStation>
    {
        public WaterSupplyStationRepository(AppDbContext context) : base(context)
        {
        }
    }
}
