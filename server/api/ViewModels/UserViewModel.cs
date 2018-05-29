using System.Collections.Generic;

namespace KinoplanungApi.ViewModels
{
    public class UserViewModel
    {
        public string Id {get;set;}
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role {get;set;}
        public IList<int> Tenants {get;set;}
    }
}