using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoplanungApi.Models.Entities
{
    public class Duty : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }

        public int DutyTypeId { get; set; }
        public DutyType DutyType { get; set; }

        [Required]
        [ForeignKey("Function")]
        public int FunctionId { get; set; }

        public Function Function { get; set; }

        [StringLength(4000)]
        public string Comment { get; set; }


        [ForeignKey("AppUser")]
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
