using gis.Data;
using gis.DTOs.PermissionDTO;
using gis.Models;
using Microsoft.EntityFrameworkCore;


namespace gis.Repositories
{
    public class PermissionRepository : Repository<Permission>
    {
        private readonly AppDbContext _context;
        public PermissionRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ListPermissionDTO>> GetListAsync(ParamListPermissionDTO request)
        {

            return await _context.Permissions
                .Where(c => c.PermissionName.Contains(request.PermissionName ?? ""))
                .Select(p => new ListPermissionDTO
                {
                    PermissionID = p.PermissionID,
                    PermissionName = p.PermissionName,
                    Description = p.Description
                })
                .ToListAsync();
        }
        public async Task<bool> ExistPermissionName(string name)
        {
            return await _context.Permissions.AnyAsync(p => p.PermissionName == name);
        }
    }
}
