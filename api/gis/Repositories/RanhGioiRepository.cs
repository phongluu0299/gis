using gis.Data;
using gis.DTOs;
using gis.Helpers;
using gis.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace gis.Repositories
{
    public class RanhGioiRepository : Repository<RanhGioi>
    {
        private readonly AppDbContext _context;
        public RanhGioiRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

    
    }
}
