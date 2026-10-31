
using gis.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace gis.Repositories
{
    public class AuthRepository
    {
        private readonly AppDbContext _context;
        
        public AuthRepository(AppDbContext context )
        {
            _context = context;
        }


    }
}
