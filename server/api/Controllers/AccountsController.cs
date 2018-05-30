using System.Threading.Tasks;
using KinoplanungApi.Data;
using KinoplanungApi.Helpers;
using KinoplanungApi.Models.Entities;
using KinoplanungApi.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace KinoplanungApi.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int id)
        {
            var users = await _appDbContext.AppUsers.Include(a => a.TenantMappings).ToListAsync();
            var regUsers = new List<UserViewModel>();
            foreach (var u in users)
            {
                var roles = await this._userManager.GetRolesAsync(u);
                var tenants = u.TenantMappings.Select(tm => tm.TenantId).ToList();
                regUsers.Add(new UserViewModel() { LastName = u.LastName, FirstName = u.FirstName, Email = u.Email, Id = u.Id, Role = roles.Single(), Tenants = tenants });
            }

            return new OkObjectResult(regUsers);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var function = await _appDbContext.AppUsers.SingleOrDefaultAsync(t => t.Id == id);
            if (function == null)
            {
                return BadRequest();
            }

            _appDbContext.AppUsers.Remove(function);
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(new { text = $"Account with Id:{id} deleted!" });
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Save([FromBody]UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(modelState: Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(model);
        }
    }
}
