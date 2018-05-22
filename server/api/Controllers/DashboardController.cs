
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoplanungApi.Data;
using KinoplanungApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 

namespace KinoplanungApi.Controllers
{
  [Authorize(Policy = "ApiUser")]
  public class DashboardController : Controller
  {
    private readonly ClaimsPrincipal _caller;
    private readonly ApplicationDbContext _appDbContext;

    public DashboardController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _appDbContext = appDbContext;
    }

    // GET api/dashboard/home
    [HttpGet]
    public async Task<IActionResult> Home()
    {
      // retrieve the user info
      //HttpContext.User
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var customer = await _appDbContext.AppUsers.SingleAsync(c => c.Id == userId.Value);
      
      return new OkObjectResult(new
      {
        Message = "This is secure API and user data!",
        customer
      });
    }
  }
}
