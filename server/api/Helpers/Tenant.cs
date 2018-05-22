using System.Collections.Generic;
using System.IO;
using KinoplanungApi.Models.Entities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

public static class TenantHelper
{

    public static List<Tenant> LoadTenants(string file)
    {
        if (!File.Exists(file)) return new List<Tenant>();

        return JsonConvert.DeserializeObject<List<Tenant>>(File.ReadAllText(file));

    }
}

public interface ITenantProvider
{
    List<Tenant> Tenants { get; }
}

public class TenantProvider : ITenantProvider
{

    private List<Tenant> tenants;
    public TenantProvider(IConfiguration configuration)
    {
        var file = configuration.GetSection("Tenant")["file"];
        this.tenants = TenantHelper.LoadTenants(file);
    }

    public List<Tenant> Tenants { get { return this.tenants; } }
}