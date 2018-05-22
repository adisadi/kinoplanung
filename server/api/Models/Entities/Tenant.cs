using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KinoplanungApi.Models.Entities
{
    public class Tenant : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public List<UserTenantMapping> AppUserMappings {get;set;}
    }
}
