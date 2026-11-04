using gis.Data;
using gis.DTOs.DongHoKhachHangDTO;
using gis.DTOs.GhiThuTheoKyDTO;
using gis.Helpers;
using gis.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
namespace gis.Repositories
{
    public class GhiThuTheoKyRepository : Repository<GhiThuTheoKy>
    {
        private readonly AppDbContext _context;
        public GhiThuTheoKyRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    
        public async Task<IEnumerable<GhiThuTheoKyByBoundDTO>> GetByBound(Dictionary<string,string> param)
        {
            var p = new List<SqlParameter>();
            foreach (var item in param)
            {
                p.Add(new SqlParameter("@" + item.Key, item.Value));
            }
            return await _context.SqlQueryAsync<GhiThuTheoKyByBoundDTO>("EXEC GetGhiThuTheoKyByBound " + string.Join(", ", param.Select(x => "@" + x.Key).ToArray()), p.ToArray());
        }

        public async ValueTask<GhiThuTheoKyByBoundDTOWithInfo> GetInfoByIdAsync(long id)
        {
            var old = await _context.GhiThuTheoKys.FirstOrDefaultAsync(c => c.GhiThuID == id);
            if (old != null)
            {
                return new GhiThuTheoKyByBoundDTOWithInfo
                {
                    id = old.GhiThuID,
                    ChiSoCu = old.ChiSoCu,
                    ChiSoMoi = old.ChiSoMoi,
                    NgayGhi = old.NgayGhi?.ToString("dd/MM/yyyy"),
                    ThanhTien = old.ThanhTien,
                    LuongTieuThu = old.LuongTieuThu,
                    MaDB = old.MaDB,
                    MaNV = old.MaNV,
                    TrangThaiTT = old.TrangThaiTT,
                    TenNV = old.TenNV,
                    HoTenKH = old.HoTenKH
                };
            }
            return new GhiThuTheoKyByBoundDTOWithInfo
            {
                id = 0,
                ChiSoCu = 0,
                ChiSoMoi = 0,
                NgayGhi = null,
                ThanhTien = 0,
                LuongTieuThu = 0,
                MaDB = null,
                MaNV = null,
                TrangThaiTT = null,
                TenNV = null,
                HoTenKH = null
            };
        }
    }
}

