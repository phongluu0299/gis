using gis.DTOs;
using gis.Models;

namespace gis.Services
{
    public class WaterSupplyStationService
    {
        private readonly UnitOfWork _unitOfWork;

        public WaterSupplyStationService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<WaterSupplyStation?> GetByIdAsync(int id)
        {
            return await _unitOfWork.WaterSupplyStationRepository.GetByIdAsync(id);
        }
        public async Task AddAsync(WaterSupplyStation entity)
        {
            await _unitOfWork.WaterSupplyStationRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task AddRangeAsync(IEnumerable<WaterSupplyStation> entities)
        {
            await _unitOfWork.WaterSupplyStationRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<WaterSupplyStation>> GetAllAsync()
        {
            return await _unitOfWork.WaterSupplyStationRepository.GetAllAsync();
        }

        public async Task RemoveAsync(WaterSupplyStation entity)
        {
            _unitOfWork.WaterSupplyStationRepository.Remove(entity);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
