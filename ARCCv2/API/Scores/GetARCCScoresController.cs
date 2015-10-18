using ARCCv2.Models;
using System.Collections.Generic;

namespace ARCCv2.API.Scores
{
    public class GetARCCScoresController : ARCCApiController
    {
        /// <summary>
        /// Gets all the active committee members from the db - tina
        /// </summary>
        /// <returns>List of committe members</returns>
        public List<User> Get() => userManager.GetAllActiveCommitteeMembers();

        /// <summary>
        /// Gets all the arcc scores associated with a specific arcc proposal - tina
        /// </summary>
        /// <param name="id">primary key for arcc proposal</param>
        /// <returns>List of ARCCScore records</returns>
        public List<ARCCScore> Get(int id) => scoreManager.GetARCCScoresForProposal(id);
    }
}