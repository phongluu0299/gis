using gis.DTOs;
using gis.DTOs.UserDTO;
using gis.Helpers;
using gis.Models;
using gis.Utils;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace gis.Services
{
    public class AuthService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly JwtHelper _jwtHelper;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
         
        public AuthService(UnitOfWork unitOfWork, JwtHelper jwtHelper, IConfiguration configuration, IMemoryCache cache )
        {
            _unitOfWork = unitOfWork;
            _jwtHelper = jwtHelper;
            _configuration = configuration;
            _cache = cache;
        }

        public async Task<Result<LoginResponse>> Login(LoginRequest loginRequest)
        {
            User? user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(loginRequest.username);
            if (user == null)
            {
                return new Result<LoginResponse>(StatusCodes.Status404NotFound, "Người dùng không tồn tại");
            }
            string md5Hash = Utilities.Md5(loginRequest.password);
            string sha256Hash = Utilities.Sha256(loginRequest.password);
            if (VerifyPassword(loginRequest.password, user))
            {
                var refreshToken = GenerateRefreshToken(user);
                var data = GetToken(user, refreshToken);
                return new Result<LoginResponse>(StatusCodes.Status200OK, "Đăng nhập thành công", data);
            }
            else
            {
                return new Result<LoginResponse>(StatusCodes.Status401Unauthorized, "Sai mật khẩu");
            }
        }
        private string GenerateRefreshToken(User user)
        {
            var jwt = _configuration.GetSection("Jwt");

            var refreshToken =
                 _jwtHelper.GenerateRefreshToken();

            var refreshTokenHash =
                _jwtHelper.HashRefreshToken(refreshToken);

            _cache.Set($"refresh:{refreshTokenHash}", user.UserID, TimeSpan.FromDays(int.Parse(jwt["RefreshTokenExpireDays"] ?? "7")));

            return refreshToken;
        }
        private LoginResponse GetToken(User user, string refreshToken)
        {
            var token = _jwtHelper.GenerateToken(user);
            return new LoginResponse
            {
                AccessToken = token,
                TokenType = "Bearer",
                ExpiresIn = int.Parse(_configuration.GetSection("Jwt")["ExpireMinutes"] ?? "480") * 60,
                RefreshToken = refreshToken
            };
        }

        private bool VerifyPassword(string password, User user)
        {
            string randomCode = user.RandomCode ?? "";
            string hash = Utilities.Sha256(randomCode + password + randomCode + randomCode);
            return hash == user.Password;
        }

        public async Task<Result<object>> RefreshAsync(
    string refreshToken)
        {
            var oldTokenHash =
                _jwtHelper.HashRefreshToken(refreshToken);

            if (!_cache.TryGetValue(
                $"refresh:{oldTokenHash}",
                out int userId))
            {
                return new Result<object>(
                    StatusCodes.Status401Unauthorized,
                    "Refresh token không hợp lệ hoặc đã hết hạn"
                );
            }

            var user = await _unitOfWork.UserRepository
                .GetUserByIdAsync(userId);

            if (user == null)
            {
                _cache.Remove($"refresh:{oldTokenHash}");

                return new Result<object>(
                    StatusCodes.Status401Unauthorized,
                    "Người dùng không tồn tại"
                );
            }

            // Rotate: xóa refresh token cũ
            _cache.Remove($"refresh:{oldTokenHash}");

            var newAccessToken =
                _jwtHelper.GenerateToken(user);

            var newRefreshToken =
                _jwtHelper.GenerateRefreshToken();

            var newRefreshTokenHash =
                _jwtHelper.HashRefreshToken(newRefreshToken);

            var jwt = _configuration.GetSection("Jwt");

            _cache.Set(
                $"refresh:{newRefreshTokenHash}",
                user.UserID,
                TimeSpan.FromDays(int.Parse(jwt["RefreshTokenExpireDays"] ?? "7"))
            );

            return new Result<object>(
                StatusCodes.Status200OK,
                "Làm mới token thành công",

             new RefreshTokenResponse
             {
                 AccessToken = newAccessToken,
                 RefreshToken = newRefreshToken
             }
            );
        }
    }
}
