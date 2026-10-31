using System.Security.Cryptography;
using System.Text;

namespace gis.Utils
{
    public static class Utilities
    {

        public static string Md5(string input)
        {
            using var md5 = MD5.Create();

            byte[] bytes = Encoding.UTF8.GetBytes(input);
            byte[] hash = md5.ComputeHash(bytes);

            return Convert.ToHexString(hash).ToLower();
        }

        public static string Sha256(string input)
        {
            using var sha256 = SHA256.Create();

            byte[] bytes = Encoding.UTF8.GetBytes(input);
            byte[] hash = sha256.ComputeHash(bytes);

            return Convert.ToHexString(hash).ToLower();
        }
    }
}
