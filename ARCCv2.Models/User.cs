using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class User
    {
        public int UserID { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        public int UserTypeID { get; set; }
        public bool UserIsActive { get; set; }
        public string UserLastUpdatedBy { get; set; }
        public DateTime UserLastUpdatedDate { get; set; }
    }
}
