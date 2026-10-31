using gis.DTOs;
using gis.Models;

namespace gis.Services
{
    public class UserService
    {
        private readonly UnitOfWork _unitOfWork;

        public UserService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<User?> GetUserById(int id)
        {
            return _unitOfWork.UserRepository.GetUserByIdAsync(id);
        }
    }
}
