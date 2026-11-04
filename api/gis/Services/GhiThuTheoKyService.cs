using gis.DTOs;
using gis.DTOs.GhiThuTheoKyDTO;
using gis.DTOs.GhiThuTheoKyDTO;
using gis.Models;

namespace gis.Services
{
    public class GhiThuTheoKyService
    {
        private readonly UnitOfWork _unitOfWork;

        public GhiThuTheoKyService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GhiThuTheoKy?> GetByIdAsync(long id)
        {
            return await _unitOfWork.GhiThuTheoKyRepository.GetByIdAsync(id);
        }
        public async Task<GhiThuTheoKyByBoundDTOWithInfo> GetInfoByIdAsync(long id)
        {
            return await _unitOfWork.GhiThuTheoKyRepository.GetInfoByIdAsync(id);
        }
        public async Task AddAsync(GhiThuTheoKy entity)
        {
            await _unitOfWork.GhiThuTheoKyRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task AddRangeAsync(IEnumerable<GhiThuTheoKy> entities)
        {
            await _unitOfWork.GhiThuTheoKyRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<GhiThuTheoKy>> GetAllAsync()
        {
            return await _unitOfWork.GhiThuTheoKyRepository.GetAllAsync();
        }  
        public async Task<IEnumerable<GhiThuTheoKyByBoundDTO>> GetByBound(ParamGTTKByBoundDTO request)
        {
            Dictionary<string, string> param = new Dictionary<string, string>
            {
                { "North", request.north.ToString() },
                { "South", request.south.ToString() },
                { "East", request.east.ToString() },
                { "West", request.west.ToString() },
                { "Month", request.month.ToString() },
                { "Year", request.year.ToString() }
            };
            return await _unitOfWork.GhiThuTheoKyRepository.GetByBound(param);
        }

        public void Remove(GhiThuTheoKy entity)
        {
            _unitOfWork.GhiThuTheoKyRepository.Remove(entity);
            _unitOfWork.SaveChangesAsync();
        }
    }
}
