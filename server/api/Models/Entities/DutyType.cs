using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoplanungApi.Models.Entities
{
    public class DutyType : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Color { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
