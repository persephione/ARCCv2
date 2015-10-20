using ARCCv2.Models;
using System.Collections.Generic;
using System.Web.Http;
using ARCCv2.Business.POCO;

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
        
        /// <summary>
        /// Looks up user's id and submits both the user id and the proposal id to method in business
        /// that will look up to see if user has submitted a score for the proposal.
        /// If they have, then it will return the DeeScore record - tina
        /// </summary>
        /// <param name="id">dee proposal id</param>
        /// <returns>DeeScore or null</returns>
        public DeeScore Post(int id)
        {
            // TODO: Get user Id and submit it to the method in the db for the lookup
            return scoreManager.GetDeeScoreForProposal(9, id);      // TODO: Remove hardcoded id after authentication is working -----------//
        } 

    }
}