using FluentValidation;
 

namespace KinoplanungApi.ViewModels.Validations
{
    public class DutyTypeViewModelValidator : AbstractValidator<DutyTypeViewModel>
    {
        public DutyTypeViewModelValidator()
        {
            RuleFor(vm => vm.Name).NotEmpty().WithMessage("DutyType Name can't be empty");
            RuleFor(vm => vm.Color).NotEmpty().WithMessage("DutyType Color can't be empty");
            RuleFor(vm => vm.TenantId).NotEmpty().WithMessage("DutyType TenantId can't be empty");
        }
    }
}