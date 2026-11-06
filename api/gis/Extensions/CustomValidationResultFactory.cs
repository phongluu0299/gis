using FluentValidation;
using FluentValidation.Results;
using gis.Helpers;
using gis.Utils;
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

                return new ValidateRes
                {
                    Field = Utilities.ToCamelCase(field),
                    Message = error.ErrorMessage
                };
            })
            .ToList();
        IActionResult? response;
        if (errors.Count == 1)
        {
            response = new BadRequestObjectResult(
                new Result<ValidateRes>
                {
                    Code = 400,
                    Message = "Dữ liệu không hợp lệ.",
                    Data = errors[0]
                });
            return Task.FromResult<IActionResult?>(response);
        }
        else
        {
            response = new BadRequestObjectResult(
               new Result<List<ValidateRes>>
               {
                   Code = 400,
                   Message = "Dữ liệu không hợp lệ.",
                   Data = errors
               });
        }

        return Task.FromResult<IActionResult?>(response);
    }
}