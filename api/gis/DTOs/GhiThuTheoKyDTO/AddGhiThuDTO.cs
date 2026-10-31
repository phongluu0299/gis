using FluentValidation;
using FluentValidation.Validators;
using NetTopologySuite.Geometries;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gis.DTOs.GhiThuTheoKyDTO
{
    public class AddGhiThuDTO
    {
        public string? MaDB { get; set; }

        public string? HoTenKH { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? ChiSoCu { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? ChiSoMoi { get; set; }

        [Column(TypeName = "numeric(18,4)")]
        public decimal? ThanhTien { get; set; }

        [Column(TypeName = "numeric(18,0)")]
        public decimal? LuongTieuThu { get; set; }

        public string? TrangThaiTT { get; set; }

        public string? MaNV { get; set; }

        public string? TenNV { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        public decimal? LocationX { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        public decimal? LocationY { get; set; }

        public DateTime? NgayGhi { get; set; }
    }

    public class AddGhiThuValidator : AbstractValidator<AddGhiThuDTO>
    {
        public AddGhiThuValidator()
        {
            RuleFor(x => x.LocationY)
                .InclusiveBetween(-90m, 90m)
                .WithMessage("Giá trị Tọa độ Y (Vĩ độ) không hợp lệ,giá trị hợp lệ nằm trong khoản (-90 -> 90)");

            RuleFor(x => x.LocationX)
                .InclusiveBetween(-180m, 180m)
                .WithMessage("Giá trị Tọa độ X (Kinh độ) không hợp lệ, giá trị hợp lệ nằm trong khoản (-180 -> 180)");

            RuleFor(x => x.ChiSoCu)
                .PrecisionScale(18, 0, true)
               .WithMessage("ChiSoCu không hợp lệ");

            RuleFor(x => x.ChiSoMoi)
               .PrecisionScale(18, 0, true)
               .WithMessage("ChiSoMoi không hợp lệ");

            RuleFor(x => x.ThanhTien)
                .PrecisionScale(18, 4, true)
                .When(x => x.ThanhTien.HasValue)
                .WithMessage("ThanhTien không hợp lệ");

            RuleFor(x => x.LuongTieuThu)
                .PrecisionScale(18, 0, true)
               .WithMessage("LuongTieuThu không hợp lệ");

            RuleFor(x => x.TrangThaiTT)
                .MaximumLength(255)
                .WithMessage("TrangThaiTT vượt quá độ dài ký tự (255)");

            RuleFor(x => x.MaNV)
                .MaximumLength(50)
                .WithMessage("MaNV vượt quá độ dài ký tự (50)");

            RuleFor(x => x.TenNV)
                .MaximumLength(100)
                .WithMessage("TenNV vượt quá độ dài ký tự (100)");

        }
    }
    public class AddGhiThuCollectionValidator : AbstractValidator<List<AddGhiThuDTO>>
    {
        public AddGhiThuCollectionValidator(AddGhiThuValidator validations)
        {
            RuleForEach(x => x).SetValidator(validations);
        }
    }
}