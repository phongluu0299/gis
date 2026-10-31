using FluentValidation;
using NetTopologySuite.Geometries;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gis.DTOs.DongHoKhachHangDTO
{
    public class AddDongHoKHDTO
    {
       
        public string? MaKH { get; set; }

        public string? MaDB { get; set; }

        public string? TenKH { get; set; }

        public string? DiaChi { get; set; }

        public string? MaLT { get; set; }

        public string? TrangThaiDongHo { get; set; }

        public decimal? LocationX { get; set; }
        public decimal? LocationY { get; set; }


        public DateTime? ThoiHanSuDung { get; set; }

        public DateTime? NSX { get; set; }

        public string? NguoiCapNhat { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? DoiTuongID { get; set; }
        public int? LoaiDongHoID { get; set; }
        public int? HinhThucThuID { get; set; }
        public bool? TrangThai { get; set; }
    }

   
    public class AddDongHoKHValidator : AbstractValidator<AddDongHoKHDTO>
    {
        public AddDongHoKHValidator()
        {
            RuleFor(x => x.MaKH)
                .MaximumLength(50)
                .WithMessage("MaKH vượt quá độ dài ký tự (50)");

            RuleFor(x => x.MaDB)
                .MaximumLength(50)
                .WithMessage("MaDB vượt quá độ dài ký tự (50)");

            RuleFor(x => x.TenKH)
                .MaximumLength(255)
                .WithMessage("TenKH vượt quá độ dài ký tự (255)");

            RuleFor(x => x.DiaChi)
                .MaximumLength(500)
                .WithMessage("DiaChi vượt quá độ dài ký tự (500)");

            RuleFor(x => x.MaLT)
                .MaximumLength(50)
                .WithMessage("MaLT vượt quá độ dài ký tự (50)");

            RuleFor(x => x.TrangThaiDongHo)
                .MaximumLength(100)
                .WithMessage("TrangThaiDongHo vượt quá độ dài ký tự (100)");

            RuleFor(x => x.LocationX) //Long
                .InclusiveBetween(-180m, 180m)
                .WithMessage("Giá trị Tọa độ X (Kinh độ) không hợp lệ, giá trị hợp lệ nằm trong khoản (-180 -> 180)");

            RuleFor(x => x.LocationY) //Lat
                .InclusiveBetween(-90m, 90m)
                .WithMessage("Giá trị Tọa độ Y (Vĩ độ) không hợp lệ,giá trị hợp lệ nằm trong khoản (-90 -> 90)");


            RuleFor(x => x.NguoiCapNhat)
                .MaximumLength(100)
                .WithMessage("NguoiCapNhat vượt quá độ dài ký tự (100)");

            RuleFor(x => x.LoaiDongHoID)
                .GreaterThan(0)
                .WithMessage("LoaiDongHoID không đúng định dạng");

            RuleFor(x => x.HinhThucThuID)
                .GreaterThan(0)
                .WithMessage("HinhThucThuID không đúng định dạng");

            RuleFor(x => x.DoiTuongID)
                .MaximumLength(255)
                .WithMessage("DoiTuongID vượt quá độ dài ký tự (255)");
        }
    }

    public class AddDongHoKHCollectionValidator : AbstractValidator<List<AddDongHoKHDTO>>
    {
        public AddDongHoKHCollectionValidator(AddDongHoKHValidator validations)
        {
            RuleForEach(x => x).SetValidator(validations);

        }
    }
}