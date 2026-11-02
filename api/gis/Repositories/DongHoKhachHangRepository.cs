using gis.Data;
using gis.DTOs.DongHoKhachHangDTO;
using gis.Models;

using Microsoft.Data.SqlClient;

using gis.Helpers;
using Microsoft.EntityFrameworkCore;
namespace gis.Repositories
{
    public class DongHoKhachHangRepository : Repository<DongHoKhachHang>
    {
        private readonly AppDbContext _context;
        public DongHoKhachHangRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    
        public async Task<IEnumerable<DongHoKHByBoundDTO>> GetByBound(Dictionary<string,string> param)
        {
            var p = new List<SqlParameter>();
            foreach (var item in param)
            {
                p.Add(new SqlParameter("@" + item.Key, item.Value));
            }
            return await _context.SqlQueryAsync<DongHoKHByBoundDTO>("EXEC GetDongHoKHByBound " + string.Join(", ", param.Select(x => "@" + x.Key).ToArray()), p.ToArray());
        }
    }
}

