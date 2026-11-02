using gis.DTOs;
using gis.Models;

namespace gis.Services
{
    public class PipelineService
    {
        private readonly UnitOfWork _unitOfWork;

        public PipelineService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pipeline?> GetByIdAsync(int id)
        {
            return await _unitOfWork.PipelineRepository.GetByIdAsync(id);
        }
        public async Task AddAsync(Pipeline entity)
        {
            await _unitOfWork.PipelineRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task AddRangeAsync(IEnumerable<Pipeline> entities)
        {
            await _unitOfWork.PipelineRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<Pipeline>> GetAllAsync()
        {
            return await _unitOfWork.PipelineRepository.GetAllAsync();
        }

        public void Remove(Pipeline entity)
        {
            _unitOfWork.PipelineRepository.Remove(entity);
            _unitOfWork.SaveChangesAsync();
        }
    }
}
