using FluentValidation;


namespace KinoplanungApi.ViewModels.Validations
{
    public class FunctionViewModelValidator : AbstractValidator<FunctionViewModel>
    {
        public FunctionViewModelValidator()
        {
            RuleFor(vm => vm.Name).NotEmpty().WithMessage("Function Name can't be empty");
            RuleFor(vm => vm.TenantId).NotEmpty().WithMessage("Function TenantId can't be empty");
        }
    }
}