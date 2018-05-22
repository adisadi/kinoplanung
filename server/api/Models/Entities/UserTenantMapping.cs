using System.ComponentModel.DataAnnotations;

namespace KinoplanungApi.Models.Entities
{
    public class UserTenantMapping : BaseEntity
    {
        public string AppUserId { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant {get;set;}
        public AppUser AppUser {get;set;}
    }
}