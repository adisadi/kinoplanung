using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoplanungApi.Data;
using KinoplanungApi.Models.Entities;
using KinoplanungApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KinoplanungApi.Controllers
{
    /*   [Authorize(Policy = "ApiUser")] */
    public class TenantController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;

        public TenantController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return new OkObjectResult(await _appDbContext.Tenants.ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return new OkObjectResult(await _appDbContext.Tenants.SingleOrDefaultAsync(t => t.Id == id));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var tenant = await _appDbContext.Tenants.SingleOrDefaultAsync(t => t.Id == id);
            if (tenant == null)
            {
                return BadRequest();
            }

            _appDbContext.Tenants.Remove(tenant);
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult($"Tenant with Id:{id} deleted!");
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]TenantViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Tenant tenant = null;
            if (model.Id == 0)
            {
                tenant = new Tenant();
                _appDbContext.Tenants.Add(tenant);
            }
            else
            {
                tenant = await _appDbContext.Tenants.SingleOrDefaultAsync(t => t.Id == model.Id);
            }

            if (tenant == null)
            {
                return BadRequest();
            }

            tenant.Name = model.Name;

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(new { new_id = tenant.Id });
        }
    }
}