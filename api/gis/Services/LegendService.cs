using gis.DTOs;
using gis.Models;

namespace gis.Services
{
    public class LegendService
    {
        private readonly UnitOfWork _unitOfWork;

        public LegendService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Legend>> GetAllAsync()
        {
            return await _unitOfWork.LegendRepository.GetAllAsync();
        }

        //public async Task<Legend?> GetByIdAsync(int id)
        //{
        //    return await _unitOfWork.LegendRepository.GetByIdAsync(id);
        //}
        //public async Task AddAsync(Legend entity)
        //{
        //    await _unitOfWork.LegendRepository.AddAsync(entity);
        //    await _unitOfWork.SaveChangesAsync();
        //}
        //public async Task UpdateAsync(Permission entity)
        //{
        //    await _unitOfWork.LegendRepository.UpdateAsync(entity);
        //    await _unitOfWork.SaveChangesAsync();
        //}

        //public async Task AddRangeAsync(IEnumerable<Legend> entities)
        //{
        //    await _unitOfWork.LegendRepository.AddRangeAsync(entities);
        //    await _unitOfWork.SaveChangesAsync();
        //}

      

        //public void Remove(Legend entity)
        //{
        //    _unitOfWork.LegendRepository.Remove(entity);
        //    _unitOfWork.SaveChangesAsync();
        //}


    }
}
