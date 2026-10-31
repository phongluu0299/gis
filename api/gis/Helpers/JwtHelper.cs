using gis.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace gis.Helpers;

public class JwtHelper
{
    private readonly IConfiguration _configuration;

    public JwtHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string GenerateToken(User user)
    {
        var jwt = _configuration.GetSection("Jwt");

        var key = jwt["Key"]
            ?? throw new Exception("Jwt:Key chưa được cấu hình.");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserID.ToString()),
            new(ClaimTypes.Name, user.UserName ?? "Unknow"),
            new(ClaimTypes.GivenName, user.FullName ?? "Unknow")


        };
        if(user.UserName == "admin")
        {
            claims.Add(new Claim(ClaimTypes.Role, "admin"));
        }
        // Nếu User có role thì thêm:
        // claims.Add(new Claim(ClaimTypes.Role, user.Role));

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key)
        );

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(jwt["ExpireMinutes"] ?? "480")
            ),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);

        return Convert.ToBase64String(bytes);
    }

    public string HashRefreshToken(string refreshToken)
    {
        var bytes = SHA256.HashData(
            Encoding.UTF8.GetBytes(refreshToken)
        );

        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    public DateTime GetRefreshTokenExpireTime()
    {
        var jwt = _configuration.GetSection("Jwt");
        
        return DateTime.UtcNow.AddDays(int.Parse(jwt["RefreshTokenExpireDays"] ?? "7"));
    }
}