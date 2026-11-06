using FluentValidation;
using gis.Services;

namespace gis.DTOs.PermissionDTO
{
    public class AddOrUpdPermissionDTO
    {


        public string PermissionName { get; set; }

        public string? Description { get; set; }
    }

   
    public class AddOrUpdPermissionValidator : AbstractValidator<AddOrUpdPermissionDTO>
    {
        public AddOrUpdPermissionValidator(PermissionService permissionService)
        {
            RuleFor(x => x.PermissionName)
                .NotEmpty()
                .WithMessage("Tên quyền không được để trống");

            RuleFor(x => x.PermissionName)
              .MaximumLength(150)
              .WithMessage("Độ dài vượt quá 150 ký tự");

            RuleFor(x => x.Description)
            .MaximumLength(255)
            .WithMessage("Độ dài vượt quá 255 ký tự");
        }
    }
}