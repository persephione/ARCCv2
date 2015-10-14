using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Models
{
    public partial class UserType
    {
        public int UserTypeID { get; set; }
        public string UserTypeDescription { get; set; }
        public string UserTypeLastUpdatedBy { get; set; }
        public DateTime UserTypeLastUpdatedDate { get; set; }
    }
}
