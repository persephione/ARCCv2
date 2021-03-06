﻿using ARCCv2.Models;
using System.Collections.Generic;
using System.Linq;

namespace ARCCv2.Business.DatabaseQueries
{
    public class UserQueries : BusinessBase
    {
        /// <summary>
        /// Gets a list of all the active committee members - tina
        /// </summary>
        /// <returns>list of committe members</returns>
        public List<User> GetAllActiveCommitteeMembers() => Uow.UserRepository.GetAll().Where(x => x.UserIsActive == true).ToList();
    }
}
