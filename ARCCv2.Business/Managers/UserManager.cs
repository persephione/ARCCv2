using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARCCv2.Models;

namespace ARCCv2.Business.Managers
{
    public class UserManager : BusinessBase
    {
        public List<User> GetAllActiveCommitteeMembers() => userQueries.GetAllActiveCommitteeMembers().ToList();
    }
}
