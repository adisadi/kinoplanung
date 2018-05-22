using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace KinoplanungApi.Models.Entities
{
    public class AppUser : IdentityUser
    {
        [Required]
        [StringLength(200)]
        public string FirstName { get; set; }

        [StringLength(200)]
        public string LastName { get; set; }

        public List<Duty> Duties { get; set; }

        public List<UserTenantMapping> TenantMappings {get;set;}
    }
}