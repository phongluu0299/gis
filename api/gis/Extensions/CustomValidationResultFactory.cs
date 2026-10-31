using FluentValidation;
using FluentValidation.Results;
using gis.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;
using System.Text.RegularExpressions;

public class CustomValidationResultFactory
    : IFluentValidationAutoValidationResultFactory
{
    public Task<IActionResult?> CreateActionResult(
        ActionExecutingContext context,
        ValidationProblemDetails validationProblemDetails,
        IDictionary<IValidationContext, ValidationResult> validationResults)
    {
        var errors = validationResults.Values
            .SelectMany(result => result.Errors)
            .Select(error =>
            {
                var field = error.PropertyName;
                var index = 0;

                var match = Regex.Match(field, @"\[(\d+)\]\.(.+)$");

                if (match.Success)
                {
                    index = int.Parse(match.Groups[1].Value);
                    field = match.Groups[2].Value;
                }

                return new ValidateRes
                {
                    Index = index,
                    Field = field,
                    Code = error.ErrorMessage
                };
            })
            .ToList();

        IActionResult response = new BadRequestObjectResult(
            new Result<List<ValidateRes>>
            {
                Code = 400,
                Message = "Dữ liệu không hợp lệ.",
                Data = errors
            });

        return Task.FromResult<IActionResult?>(response);
    }
}