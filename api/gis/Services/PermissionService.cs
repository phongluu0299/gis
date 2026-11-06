using gis.DTOs;
using gis.DTOs.PermissionDTO;
using gis.Models;
using System.Threading.Tasks;

namespace gis.Services
{
    public class PermissionService
    {
        private readonly UnitOfWork _unitOfWork;

        public PermissionService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Permission>> GetAllAsync()
        {
            return await _unitOfWork.PermissionRepository.GetAllAsync();
        }
        public async Task<IEnumerable<ListPermissionDTO>> GetListAsync(ParamListPermissionDTO param)
        {
            return await _unitOfWork.PermissionRepository.GetListAsync(param);
        }

        public async Task<Permission?> GetByIdAsync(int id)
        {
            return await _unitOfWork.PermissionRepository.GetByIdAsync(id);
        }
       
        public async Task<bool> ExistPermissionName(string name)
        {
            return await _unitOfWork.PermissionRepository.ExistPermissionName(name);
        }
        
        public async Task<int> AddAsync(AddOrUpdPermissionDTO entity)
        {
            Permission permission = new Permission(entity);
            await _unitOfWork.PermissionRepository.AddAsync(permission);
            await _unitOfWork.SaveChangesAsync();
            return permission.PermissionID;
        }
      
        public async Task<int?> UpdateAsync(AddOrUpdPermissionDTO entity, int id)
        {

            var permission = await GetByIdAsync(id);
            if(permission == null)
            {
                return null;
            }
            permission.Description = entity.Description;
            permission.PermissionName = entity.PermissionName;

            _unitOfWork.PermissionRepository.Update(permission);
            await _unitOfWork.SaveChangesAsync();
            return permission.PermissionID;
        }

        public async Task AddRangeAsync(IEnumerable<Permission> entities)
        {
            await _unitOfWork.PermissionRepository.AddRangeAsync(entities);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> Remove(Permission entity)
        {
            _unitOfWork.PermissionRepository.Remove(entity);
          return await _unitOfWork.SaveChangesAsync();
        }


    }
}
