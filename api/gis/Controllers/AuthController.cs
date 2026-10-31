using gis.DTOs;
using gis.DTOs.UserDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using gis.Helpers;
using gis.Services;

namespace gis.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
         private readonly JwtHelper jwtHelper;
        private IConfiguration _config;
        private readonly IMemoryCache _cache;
        public AuthController(AuthService authService, IConfiguration config, JwtHelper jwtHelper,IMemoryCache cache)
        {
            this.authService = authService;
            this.jwtHelper = jwtHelper;

            _config = config;
            _cache = cache;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(
     [FromBody] LoginRequest loginRequest)
        {
            try
            {
                var result = await authService.Login(loginRequest);

                if (result.Code != StatusCodes.Status200OK)
                {
                    return StatusCode(result.Code, result);
                }

                if (result.Data is not LoginResponse loginResponse)
                {
                    return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        new Result<object>(
                            StatusCodes.Status500InternalServerError,
                            "Dữ liệu đăng nhập không hợp lệ."
                        )
                    );
                }

                var cookieConfig = _config.GetSection("Cookie");

                Response.Cookies.Append(
                    cookieConfig["Name"] ?? "refreshToken",
                    loginResponse.RefreshToken,
                    new CookieOptions
                    {
                        HttpOnly = bool.Parse(
                            cookieConfig["HttpOnly"] ?? "true"
                        ),

                        Secure = bool.Parse(
                            cookieConfig["Secure"] ?? "false"
                        ),

                        SameSite = GetSameSiteMode(
                            int.Parse(
                                cookieConfig["SameSite"] ?? "1"
                            )
                        ),

                        Expires = jwtHelper.GetRefreshTokenExpireTime(),

                        Path = "/"
                    }
                );

              
                loginResponse.RefreshToken = string.Empty;

                return Ok(
                    new Result<LoginResponse>(
                        StatusCodes.Status200OK,
                        result.Message,
                        loginResponse
                    )
                );
            }
            catch (Exception ex)
            {
                const int statusCode =
                    StatusCodes.Status500InternalServerError;

                return StatusCode(
                    statusCode,
                    new Result<string>(
                        statusCode,
                        "Có lỗi xảy ra trong quá trình thực hiện.",
                        ex.Message
                    )
                );
            }
        }
        [NonAction]
        private SameSiteMode GetSameSiteMode(int samsite)
        {
            return samsite switch
            {
                1 => SameSiteMode.Lax,
                2 => SameSiteMode.Strict,
                 0 => SameSiteMode.None,
                -1 => SameSiteMode.Unspecified
            };
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var cookieConfig = _config.GetSection("Cookie");
            var cookieName =
                cookieConfig["Name"] ?? "refreshToken";

            var refreshToken =
                Request.Cookies[cookieName];

            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Unauthorized(
                    new Result<object>(
                        StatusCodes.Status401Unauthorized,
                        "Không tìm thấy refresh token"
                    )
                );
            }

            var result =
                await authService.RefreshAsync(refreshToken);

            if (result.Code != StatusCodes.Status200OK)
            {
                return StatusCode(result.Code, result);
            }

            if (result.Data is not RefreshTokenResponse data)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Result<object>(
                        StatusCodes.Status500InternalServerError,
                        "Dữ liệu refresh token không hợp lệ"
                    )
                );
            }
      
            Response.Cookies.Append(
                cookieName,
                data.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = bool.Parse(
                        cookieConfig["HttpOnly"] ?? "true"
                    ),
                    Secure = bool.Parse(
                        cookieConfig["Secure"] ?? "false"
                    ),
                    SameSite = GetSameSiteMode(
                        int.Parse(
                            cookieConfig["SameSite"] ?? "1"
                        )
                    ),
                    Expires = jwtHelper.GetRefreshTokenExpireTime(),
                    Path = "/"
                }
            );

            return Ok(
                new Result<object>(
                    StatusCodes.Status200OK,
                    "Làm mới token thành công",
                    new
                    {
                        accessToken = data.AccessToken
                    }
                )
            );
        }
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.Identity?.Name;
            var fullname = User.FindFirst(ClaimTypes.GivenName)?.Value;
            return Ok(new
            {
                userId,
                username,
                fullname
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var cookieConfig = _config.GetSection("Cookie");
            var cookieName =
                cookieConfig["Name"] ?? "refreshToken";

            var refreshToken =
                Request.Cookies[cookieName];

            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                var tokenHash =
                    jwtHelper.HashRefreshToken(refreshToken);

                _cache.Remove($"refresh:{tokenHash}");
            }

            Response.Cookies.Delete(
                cookieName,
                new CookieOptions
                {
                    HttpOnly = bool.Parse(
                        cookieConfig["HttpOnly"] ?? "true"
                    ),
                    Secure = bool.Parse(
                        cookieConfig["Secure"] ?? "false"
                    ),
                    SameSite = GetSameSiteMode(
                        int.Parse(
                            cookieConfig["SameSite"] ?? "1"
                        )
                    ),
                    Path = "/api/auth"
                }
            );

            return Ok(
                new Result<object>(
                    StatusCodes.Status200OK,
                    "Đăng xuất thành công"
                )
            );
        }
    }
}
