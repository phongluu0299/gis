using gis.DTOs;
using gis.DTOs.DongHoKhachHangDTO;
using gis.Models;

namespace gis.Services
{
    public class DongHoKhachHangService
    {
        private readonly UnitOfWork _unitOfWork;

        public DongHoKhachHangService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<DongHoKhachHang?> GetByIdAsync(long id)
        {
            return await _unitOfWork.DongHoKhachHangRepository.GetByIdAsync(id);
        }
        public async Task AddAsync(DongHoKhachHang entity)
        {
            await _unitOfWork.DongHoKhachHangRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task AddRangeAsync(IEnumerable<DongHoKhachHang> entities)
        {
            await _unitOfWork.DongHoKhachHangRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<DongHoKhachHang>> GetAllAsync()
        {
            return await _unitOfWork.DongHoKhachHangRepository.GetAllAsync();
        }  
        public async Task<IEnumerable<DongHoKHByBoundDTO>> GetByBound(ParamDHKHByBoundDTO request)
        {
            Dictionary<string, string> param = new Dictionary<string, string>
            {
                { "North", request.north.ToString() },
                { "South", request.south.ToString() },
                { "East", request.east.ToString() },
                { "West", request.west.ToString() }
            };
            return await _unitOfWork.DongHoKhachHangRepository.GetByBound(param);
        }

        public void Remove(DongHoKhachHang entity)
        {
            _unitOfWork.DongHoKhachHangRepository.Remove(entity);
            _unitOfWork.SaveChangesAsync();
        }
    }
}
