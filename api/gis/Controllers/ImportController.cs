using gis.DTOs;
using gis.DTOs.UserDTO;
using gis.Helpers;
using gis.Models;
using gis.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

using System.Text.Json;

namespace gis.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Policy = "ImportGeoJson")]
    public class ImportController : ControllerBase
    {
        private readonly RanhGioiService ranhGioiService;

        public ImportController(RanhGioiService ranhGioiService)
        {
            this.ranhGioiService = ranhGioiService;

        }


        [HttpPost("import-geojson")]
        [RequestSizeLimit(100 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 100 * 1024 * 1024)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportGeoJson( IFormFile file, CancellationToken cancellationToken)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Vui lòng chọn file GeoJSON.");

            var rows = new List<RanhGioi>();
            var featureIndex = 0;

            try
            {
                await using var stream = file.OpenReadStream();

                using var document = await JsonDocument.ParseAsync(
                    stream,
                    cancellationToken: cancellationToken);

                var root = document.RootElement;

                if (root.ValueKind != JsonValueKind.Object ||
                    !root.TryGetProperty("type", out var type) ||
                    type.GetString() != "FeatureCollection" ||
                    !root.TryGetProperty("features", out var features) ||
                    features.ValueKind != JsonValueKind.Array)
                {
                    return BadRequest("File phải là GeoJSON dạng FeatureCollection.");
                }

                var reader = new GeoJsonReader();

                foreach (var feature in features.EnumerateArray())
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    featureIndex++;

                    if (feature.ValueKind != JsonValueKind.Object ||
                        !feature.TryGetProperty("type", out var featureType) ||
                        featureType.GetString() != "Feature")
                    {
                        throw new ArgumentException("Đối tượng phải có type là Feature.");
                    }

                    if (!feature.TryGetProperty("properties", out var properties) ||
                        properties.ValueKind != JsonValueKind.Object)
                    {
                        throw new ArgumentException("Thiếu properties hợp lệ.");
                    }

                    if (!feature.TryGetProperty("geometry", out var geometryJson) ||
                        geometryJson.ValueKind != JsonValueKind.Object)
                    {
                        throw new ArgumentException("Thiếu geometry hợp lệ.");
                    }

                    var geometry = reader.Read<Geometry>(
                        geometryJson.GetRawText());

                    MultiPolygon multiPolygon = geometry switch
                    {
                        MultiPolygon polygons => polygons,

                        Polygon polygon => polygon.Factory.CreateMultiPolygon(
                            new[] { polygon }),

                        _ => throw new ArgumentException(
                            "Geometry phải là Polygon hoặc MultiPolygon.")
                    };

                    // Đầu vào phải dùng WGS84 [kinh độ, vĩ độ].
                    // Gán SRID không thực hiện chuyển hệ tọa độ.
                    multiPolygon.SRID = 4326;

                    if (multiPolygon.IsEmpty)
                        throw new ArgumentException("Geometry không được rỗng.");

                    if (!multiPolygon.IsValid)
                        throw new ArgumentException("Geometry không hợp lệ.");

                    foreach (var coordinate in multiPolygon.Coordinates)
                    {
                        if (!double.IsFinite(coordinate.X) ||
                            !double.IsFinite(coordinate.Y) ||
                            coordinate.X < -180 || coordinate.X > 180 ||
                            coordinate.Y < -90 || coordinate.Y > 90)
                        {
                            throw new ArgumentException(
                                "Tọa độ nằm ngoài phạm vi kinh độ/vĩ độ WGS84.");
                        }
                    }

                    rows.Add(new RanhGioi
                    {
                        MaXa = ReadString(properties, "ma_xa") ?? "",
                        TenXa = ReadString(properties, "ten_xa") ?? "",
                        SapNhap = ReadString(properties, "sap_nhap"),
                        TruSo = ReadString(properties, "tru_so"),
                        Loai = ReadString(properties, "loai") ?? "",
                        Cap = ReadInt(properties, "cap"),
                        Stt = ReadInt(properties, "stt"),
                        DienTichKm2 = ReadDouble(properties, "dtich_km2"),
                        DanSo = ReadInt(properties, "dan_so"),
                        MatDoKm2 = ReadDouble(properties, "matdo_km2"),
                        MaTinh = ReadString(properties, "ma_tinh") ?? "",
                        TenTinh = ReadString(properties, "ten_tinh") ?? "",
                        Geometry = multiPolygon
                    });
                }

                if (rows.Count == 0)
                    return BadRequest("File không chứa Feature nào.");
            }
            catch (Exception ex) when (
                ex is JsonException ||
                ex is Newtonsoft.Json.JsonException ||
                ex is ParseException ||
                ex is ArgumentException ||
                ex is InvalidOperationException ||
                ex is FormatException ||
                ex is OverflowException)
            {
                return BadRequest(new
                {
                    Message = "Dữ liệu GeoJSON không hợp lệ.",
                    FeatureIndex = featureIndex, // Đếm từ 1.
                    Detail = ex.Message
                });
            }

            // Chỉ lưu sau khi toàn bộ Feature đã được đọc và kiểm tra.
            await ranhGioiService.AddRangeAsync(rows);

            return Ok(new
            {
                Message = "Import ranh giới thành công.",
                Count = rows.Count
            });
        }

        private static string? ReadString(JsonElement properties, string name)
        {
            if (!properties.TryGetProperty(name, out var value) ||
                value.ValueKind == JsonValueKind.Null)
            {
                return null;
            }

            if (value.ValueKind != JsonValueKind.String)
                throw new ArgumentException($"Thuộc tính '{name}' phải là chuỗi.");

            return value.GetString();
        }

        private static int ReadInt(JsonElement properties, string name)
        {
            if (!properties.TryGetProperty(name, out var value) ||
                value.ValueKind == JsonValueKind.Null)
            {
                return 0;
            }

            if (value.ValueKind != JsonValueKind.Number ||
                !value.TryGetInt32(out var result))
            {
                throw new ArgumentException($"Thuộc tính '{name}' phải là số nguyên Int32.");
            }

            return result;
        }

        private static double ReadDouble(JsonElement properties, string name)
        {
            if (!properties.TryGetProperty(name, out var value) ||
                value.ValueKind == JsonValueKind.Null)
            {
                return 0;
            }

            if (value.ValueKind != JsonValueKind.Number ||
                !value.TryGetDouble(out var result) ||
                !double.IsFinite(result))
            {
                throw new ArgumentException($"Thuộc tính '{name}' phải là số hữu hạn.");
            }

            return result;
        }
    }
}
