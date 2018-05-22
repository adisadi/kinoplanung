using KinoplanungApi.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace KinoplanungApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        /* public ApplicationDbContext(IHttpContextAccessor httpContentAccessor,
            IConfiguration configuration,
            ITenantProvider tenantProvider
           ):base(getOptions(httpContentAccessor,configuration,tenantProvider))
        {
            this.Database.Migrate();
        }

        private static DbContextOptions getOptions( IHttpContextAccessor httpContentAccessor,
            IConfiguration configuration,
            ITenantProvider tenantProvider){
           
           var contextFactory=new ContextFactory(httpContentAccessor,configuration,tenantProvider);
           return contextFactory.Options;
        } */

        //public DbSet<Customer> Customers { get; set; }
        public DbSet<Duty> Duties { get; set; }
        public DbSet<Function> Functions { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<DutyType> DutyTypes { get; set; }
        public DbSet<UserTenantMapping> UserTenantMappings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTenantMapping>()
                .HasKey(c => new { c.TenantId, c.AppUserId });

            base.OnModelCreating(modelBuilder);
        }
    }

}