using gis.Data;
using gis.Models;

namespace gis.Repositories
{
    public class PipelineRepository : Repository<Pipeline>
    {
        public PipelineRepository(AppDbContext context) : base(context)
        {
        }
    }
}
