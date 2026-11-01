using gis.Data;
using gis.Models;


namespace gis.Repositories
{
    public class LegendRepository : Repository<Legend>
    {
        private readonly AppDbContext _context;
        public LegendRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
