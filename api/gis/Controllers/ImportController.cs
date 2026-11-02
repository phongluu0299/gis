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
        private readonly PipelineService pipelineService;
        private readonly WaterSupplyStationService waterSupplyStationService;

        public ImportController(RanhGioiService ranhGioiService, PipelineService pipelineService, WaterSupplyStationService waterSupplyStationService)
        {
            this.ranhGioiService = ranhGioiService;
            this.pipelineService = pipelineService;
            this.waterSupplyStationService = waterSupplyStationService;

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

        [HttpPost("import-pipeline")]
        [RequestSizeLimit(100 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 100 * 1024 * 1024)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportPipeline( IFormFile file, CancellationToken cancellationToken)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Vui lòng chọn file GeoJSON.");

            var rows = new List<Pipeline>();
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

                    MultiLineString multiLineString = geometry switch
                    {
                        MultiLineString lineStrings => lineStrings,

                        LineString lineString => lineString.Factory.CreateMultiLineString(
                            new[] { lineString }),

                        _ => throw new ArgumentException(
                            "Geometry phải là LineString hoặc MultiLineString.")
                    };

                    // Đầu vào phải dùng WGS84 [kinh độ, vĩ độ].
                    // Gán SRID không thực hiện chuyển hệ tọa độ.
                    multiLineString.SRID = 4326;

                    if (multiLineString.IsEmpty)
                        throw new ArgumentException("Geometry không được rỗng.");

                    if (!multiLineString.IsValid)
                        throw new ArgumentException("Geometry không hợp lệ.");

                    foreach (var coordinate in multiLineString.Coordinates)
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

                    rows.Add(new Pipeline
                    {
                        MaHieu = ReadString(properties, "MA_HIEU") ?? "",
                        TenNvql = ReadString(properties, "TEN_NVQL") ?? "",
                        DienTich = ReadString(properties, "DIEN_TICH_") ?? "",
                        NguonGoc = ReadString(properties, "NGUON_GOC_") ?? "",
                        GiayHien = ReadString(properties, "GIAY_HIEN_") ?? "",
                        GiayPhep = ReadString(properties, "GIAY_PHEP_") ?? "",
                        NgayCap = ReadString(properties, "NGAY_CAP") ?? "",
                        ChatLuong = ReadString(properties, "CHAT_LUONG") ?? "",
                        KetCauGi = ReadString(properties, "KET_CAU_GI") ?? "",
                        TinhHinh = ReadString(properties, "TINH_HINH_") ?? "",
                        KhaNangM = ReadString(properties, "KHA_NANG_M") ?? "",
                        Loai = ReadString(properties, "Loai") ?? "",
                        TextTinh = ReadString(properties, "texttinh") ?? "",
                        ObjectId = ReadInt(properties, "OBJECTID"),
                        CsThietK = ReadInt(properties, "CS_THIET_K"),
                        KhaNangP = ReadInt(properties, "KHA_NANG_P"),
                        SoHoTren = ReadInt(properties, "SO_HO_TREN"),
                        SoHoSuD = ReadInt(properties, "SO_HO_SU_D"),
                        DoSauGie = ReadInt(properties, "DO_SAU_GIE"),
                        TongChieu = ReadInt(properties, "TONG_CHIEU"),
                        D34 = ReadInt(properties, "D34"),
                        D42 = ReadInt(properties, "D42"),
                        D49 = ReadInt(properties, "D49"),
                        D60 = ReadInt(properties, "D60"),
                        D75 = ReadInt(properties, "D75"),
                        D90 = ReadInt(properties, "D90"),
                        D114 = ReadInt(properties, "D114"),
                        D168 = ReadInt(properties, "D168"),
                        ChieuDai = ReadInt(properties, "CHIEU_DAI"),
                        SoHoTang = ReadInt(properties, "SO_HO_TANG"),
                        DuongKinh = ReadInt(properties, "DUONG_KINH"),
                        LuuLuong = ReadDouble(properties, "LUU_LUONG_"),
                        MucNuocT = ReadDouble(properties, "MUC_NUOC_T"),
                        ShapeLength = ReadDouble(properties, "Shape_Length"),
                        Geometry = multiLineString
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
            await pipelineService.AddRangeAsync(rows);

            return Ok(new
            {
                Message = "Import đường ống thành công.",
                Count = rows.Count
            });
        }

        [HttpPost("import-water-supply-station")]
        [RequestSizeLimit(100 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 100 * 1024 * 1024)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportWaterSupplyStation( IFormFile file, CancellationToken cancellationToken)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Vui lòng chọn file GeoJSON.");

            var rows = new List<WaterSupplyStation>();
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

                    if (geometry is not Point point)
                        throw new ArgumentException("Geometry trạm cấp nước phải là Point.");

                    // Đầu vào phải dùng WGS84 [kinh độ, vĩ độ].
                    // Gán SRID không thực hiện chuyển hệ tọa độ.
                    point.SRID = 4326;

                    if (point.IsEmpty)
                        throw new ArgumentException("Geometry không được rỗng.");

                    if (!point.IsValid)
                        throw new ArgumentException($"Geometry không hợp lệ (OBJECTID: {ReadInt(properties, "OBJECTID")}).");

                    foreach (var coordinate in point.Coordinates)
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

                    rows.Add(new WaterSupplyStation
                    {
                        MaHieu = ReadString(properties, "MA_HIEU") ?? "",
                        TenNvql = ReadString(properties, "TEN_NVQL") ?? "",
                        DienTich = ReadString(properties, "DIEN_TICH_") ?? "",
                        NguonGoc = ReadString(properties, "NGUON_GOC_") ?? "",
                        GiayHien = ReadString(properties, "GIAY_HIEN_") ?? "",
                        GiayPhep = ReadString(properties, "GIAY_PHEP_") ?? "",
                        NgayCap = ReadString(properties, "NGAY_CAP") ?? "",
                        ChatLuong = ReadString(properties, "CHAT_LUONG") ?? "",
                        KetCauGi = ReadString(properties, "KET_CAU_GI") ?? "",
                        TinhHinh = ReadString(properties, "TINH_HINH_") ?? "",
                        KhaNangM = ReadString(properties, "KHA_NANG_M") ?? "",
                        ObjectId = ReadInt(properties, "OBJECTID"),
                        CsThietK = ReadInt(properties, "CS_THIET_K"),
                        KhaNangP = ReadInt(properties, "KHA_NANG_P"),
                        SoHoTren = ReadInt(properties, "SO_HO_TREN"),
                        SoHoSuD = ReadInt(properties, "SO_HO_SU_D"),
                        DoSauGie = ReadInt(properties, "DO_SAU_GIE"),
                        TongChieu = ReadInt(properties, "TONG_CHIEU"),
                        D34 = ReadInt(properties, "D34"),
                        D42 = ReadInt(properties, "D42"),
                        D49 = ReadInt(properties, "D49"),
                        D60 = ReadInt(properties, "D60"),
                        D75 = ReadInt(properties, "D75"),
                        D90 = ReadInt(properties, "D90"),
                        D114 = ReadInt(properties, "D114"),
                        D168 = ReadInt(properties, "D168"),
                        ChieuDai = ReadInt(properties, "CHIEU_DAI"),
                        SoHoTang = ReadInt(properties, "SO_HO_TANG"),
                        DuongKinh = ReadInt(properties, "DUONG_KINH"),
                        LuuLuong = ReadDouble(properties, "LUU_LUONG_"),
                        MucNuocT = ReadDouble(properties, "MUC_NUOC_T"),
                        Geometry = point
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
            await waterSupplyStationService.AddRangeAsync(rows);

            return Ok(new
            {
                Message = "Import trạm cấp nước thành công.",
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
