

using System;
using System.Linq;
using System.Threading.Tasks;
using KinoplanungApi.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace KinoplanungApi.Data
{
    public class DbInitializer
    {
        private static string[] roles = new string[] { "Administrator", "Manager", "Member" };
        public static async Task Initialize(ApplicationDbContext context, UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            //Create Roles
            foreach (var r in roles)
            {
                await CreateDefaultRole(roleManager, r);
            }

            //Create Default Users
            await CreateDefaultUserAndRoleForApplication(userManager, roleManager);
        }

        private static async Task CreateDefaultUserAndRoleForApplication(UserManager<AppUser> um, RoleManager<IdentityRole> rm)
        {
            foreach (var r in roles)
            {
                var user = await CreateDefaultUser(um, r + "@test.com");
                if (user != null)
                {
                    await SetPasswordForUser(um, user, r + "1!");
                    await AddRoleToUser(um, r, user);
                }

            }
        }

        private static async Task CreateDefaultRole(RoleManager<IdentityRole> rm, string role)
        {
            var exists = await rm.RoleExistsAsync(role);
            if (exists) return;

            var ir = await rm.CreateAsync(new IdentityRole(role));
            if (!ir.Succeeded)
            {
                var exception = new ApplicationException($"role `{role}` cannot be created\n" + GetIdentiryErrorsInCommaSeperatedList(ir));
                throw exception;
            }
        }

        private static async Task<AppUser> CreateDefaultUser(UserManager<AppUser> um, string email)
        {
            if (um.Users.Any(u => u.Email == email)) return null;

            var user = new AppUser { Email = email, UserName = email, FirstName = "Admin", LastName = "Admin" };

            var ir = await um.CreateAsync(user);
            if (!ir.Succeeded)
            {
                var exception = new ApplicationException($"Default user `{email}` cannot be created\n" + GetIdentiryErrorsInCommaSeperatedList(ir));
                throw exception;
            }

            var createdUser = await um.FindByEmailAsync(email);
            return createdUser;
        }

        private static async Task SetPasswordForUser(UserManager<AppUser> um, AppUser user, string password)
        {
            var ir = await um.AddPasswordAsync(user, password);
            if (!ir.Succeeded)
            {
                var exception = new ApplicationException($"Password for the user `{user.Email}` cannot be set\n" + GetIdentiryErrorsInCommaSeperatedList(ir));
                throw exception;
            }
        }

        private static async Task AddRoleToUser(UserManager<AppUser> um, string role, AppUser user)
        {

            var ir = await um.AddToRoleAsync(user, role);
            if (!ir.Succeeded)
            {
                var exception = new ApplicationException($"The role `{role}` cannot be set for the user `{user.Email}`\n" + GetIdentiryErrorsInCommaSeperatedList(ir));
                throw exception;
            }
        }

        private static string GetIdentiryErrorsInCommaSeperatedList(IdentityResult ir)
        {
            string errors = null;
            foreach (var identityError in ir.Errors)
            {
                errors += identityError.Description;
                errors += ", ";
            }
            return errors;
        }
    }
}