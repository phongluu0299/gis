
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace gis.Helper
{
  
    public static class Functions 
    {
        private static Random random = new Random();
        public static string EncryptionKey = "M8ytuUPcVBo0AU8fvLf0";

        //Hàm mã hóa MD5
        public static string SHA256Hash(string str)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(str));

                StringBuilder sbHash = new StringBuilder();
                foreach (byte b in bHash)
                {
                    sbHash.Append(b.ToString("x2"));
                }

                return sbHash.ToString();
            }
        }

        private static readonly string[] VietnameseSigns = new string[]
        {
            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
        };

        //Lọc bỏ dấu tiếng việt
        public static string RemoveSign4VietnameseString(string str)
        {
            //Tiến hành thay thế , lọc bỏ dấu cho chuỗi
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
            return str;
        }


        //Random chuỗi ký tự
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string EncodePassWord(string passWord, string randomCode)
        {
            return SHA256Hash(randomCode + passWord + randomCode + randomCode);
        }
        public static Dictionary<string, string> FormToParams(IFormCollection form)
        {
            var param = form.ToDictionary(x => x.Key, x => x.Value.ToString());
            param = param.Where(c => c.Key.Contains("filter")).ToDictionary(x => x.Key.Replace("filter[", "").Replace("]", ""), x => x.Value.ToString());
            return param;
        }
        public static string DateToString(string? type = "")
        {
            var now = DateTime.Now.Date;
            var result = now.ToString("yyyy-MM-dd");
            switch (type)
            {
                case "startMonth":
                    result = new DateTime(now.Year, now.Month, 1).ToString("yyyy-MM-dd");
                    break;
                case "endMonth":
                    result = new DateTime(now.Year, now.Month, 1).AddMonths(1).AddDays(-1).ToString("yyyy-MM-dd");
                    break;
                case "startWeek":
                    result = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Monday).ToString("yyyy-MM-dd");
                    break;
                case "endWeek":
                    result = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Tuesday).ToString("yyyy-MM-dd");
                    break;
                default:
                    result = now.ToString("yyyy-MM-dd");
                    break;
            }
            return result;
        }
        public static string DateTimeToString(string? type = "")
        {
            var now = DateTime.Now.Date;
            var result = now.ToString("yyyy-MM-ddTHH:mm");
            switch (type)
            {
                case "startMonth":
                    result = new DateTime(now.Year, now.Month, 1).ToString("yyyy-MM-ddTHH:mm");
                    break;
                case "endMonth":
                    result = new DateTime(now.Year, now.Month, 1).AddMonths(1).AddDays(-1).ToString("yyyy-MM-ddTHH:mm");
                    break;
                case "startWeek":
                    result = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Monday).ToString("yyyy-MM-ddTHH:mm");
                    break;
                case "endWeek":
                    result = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Tuesday).ToString("yyyy-MM-ddTHH:mm");
                    break;
                default:
                    result = now.ToString("yyyy-MM-ddTHH:mm");
                    break;
            }
            return result;
        }

        public static string Encrypt(string clearText)
        {
           
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        /// <summary>
        /// Decrypt a string
        /// </summary>
        /// <param name="key">Private key</param>
        /// <param name="value">Encrypted string in Base64 format</param>
        /// <returns>Original value</returns>
        public static string? Decrypt(string? cipherText)
        {
            if (cipherText == null)
                return null;
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
   
}
