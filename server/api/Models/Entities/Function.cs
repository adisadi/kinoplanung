using System.ComponentModel.DataAnnotations;

namespace KinoplanungApi.Models.Entities
{
    public class Function : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
