using gis.Data;
using gis.DTOs;
using gis.Helpers;
using gis.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace gis.Repositories
{
    public class UserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(c => c.UserID == id);
        }
        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(c => c.UserName == username);
        }
    }
}
