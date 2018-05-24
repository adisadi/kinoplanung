using FluentValidation;
 

namespace KinoplanungApi.ViewModels.Validations
{
    public class TenantViewModelValidator : AbstractValidator<TenantViewModel>
    {
        public TenantViewModelValidator()
        {
            RuleFor(vm => vm.Name).NotEmpty().WithMessage("Tenant Name can't be empty");
        }
    }
}