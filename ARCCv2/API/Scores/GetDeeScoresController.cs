using ARCCv2.Models;
using System.Collections.Generic;

namespace ARCCv2.API.Scores
{
    public class GetDeeScoresController : ARCCApiController
    {
        /// <summary>
        /// Gets all the active committee members from the db - tina
        /// </summary>
        /// <returns>List of committe members</returns>
        public List<User> Get() => userManager.GetAllActiveCommitteeMembers();

        /// <summary>
        /// Gets all the dee scores associated with a specific dee proposal - tina
        /// </summary>
        /// <param name="id">primary key for dee proposal</param>
        /// <returns>List of DeeScore records</returns>
        public List<DeeScore> Get(int id) => scoreManager.GetDeeScoresForProposal(id);
    }
}