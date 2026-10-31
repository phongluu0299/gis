using gis.DTOs;
using gis.Models;

namespace gis.Services
{
    public class RanhGioiService
    {
        private readonly UnitOfWork _unitOfWork;

        public RanhGioiService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RanhGioi?> GetByIdAsync(int id)
        {
            return await _unitOfWork.RanhGioiRepository.GetByIdAsync(id);
        }
        public async Task AddAsync(RanhGioi entity)
        {
            await _unitOfWork.RanhGioiRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
        }
        //public async Task UpdateAsync(Permission entity)
        //{
        //    await _unitOfWork.RanhGioiRepository.UpdateAsync(entity);
        //    await _unitOfWork.SaveChangesAsync();
        //}

        public async Task AddRangeAsync(IEnumerable<RanhGioi> entities)
        {
            await _unitOfWork.RanhGioiRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<RanhGioi>> GetAllAsync()
        {
            return await _unitOfWork.RanhGioiRepository.GetAllAsync();
        }

        public void Remove(RanhGioi entity)
        {
            _unitOfWork.RanhGioiRepository.Remove(entity);
            _unitOfWork.SaveChangesAsync();
        }
    }
}
