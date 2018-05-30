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
    [Authorize(Roles = "Administrator")]
    public class FunctionController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;

        public FunctionController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int id)
        {
            return new OkObjectResult(await _appDbContext.Functions.Where(t => t.TenantId == id).ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return new OkObjectResult(await _appDbContext.Functions.SingleOrDefaultAsync(t => t.Id == id));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var function = await _appDbContext.Functions.SingleOrDefaultAsync(t => t.Id == id);
            if (function == null)
            {
                return BadRequest();
            }

            _appDbContext.Functions.Remove(function);
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(new { text = $"Tenant with Id:{id} deleted!" });
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]FunctionViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Function function = null;
            if (model.Id == 0)
            {
                function = new Function();
                _appDbContext.Functions.Add(function);
            }
            else
            {
                function = await _appDbContext.Functions.SingleOrDefaultAsync(t => t.Id == model.Id);
            }

            if (function == null)
            {
                return BadRequest();
            }

            function.Name = model.Name;
            function.TenantId = model.TenantId;

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(function);
        }
    }
}