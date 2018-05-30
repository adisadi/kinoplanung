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
    public class DutyTypeController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;

        public DutyTypeController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int id)
        {
            return new OkObjectResult(await _appDbContext.DutyTypes.Where(d => d.TenantId == id).ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return new OkObjectResult(await _appDbContext.DutyTypes.SingleOrDefaultAsync(t => t.Id == id));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var dutytype = await _appDbContext.DutyTypes.SingleOrDefaultAsync(t => t.Id == id);
            if (dutytype == null)
            {
                return BadRequest();
            }

            _appDbContext.DutyTypes.Remove(dutytype);
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(new { text = $"DutyType with Id:{id} deleted!" });
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]DutyTypeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DutyType dutyType = null;
            if (model.Id == 0)
            {
                dutyType = new DutyType();
                _appDbContext.DutyTypes.Add(dutyType);
            }
            else
            {
                dutyType = await _appDbContext.DutyTypes.SingleOrDefaultAsync(t => t.Id == model.Id);
            }

            if (dutyType == null)
            {
                return BadRequest();
            }

            dutyType.Name = model.Name;
            dutyType.TenantId = model.TenantId;
            dutyType.Color = model.Color;

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult(dutyType);
        }
    }
}