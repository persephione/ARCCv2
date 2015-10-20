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

        /// <summary>
        /// Looks up user's id and submits both the user id and the proposal id to method in business
        /// that will look up to see if user has submitted a score for the proposal.
        /// If they have, then it will return the ARCCScore record - tina
        /// </summary>
        /// <param name="id">arcc proposal id</param>
        /// <returns>ARCCScore or null</returns>
        public ARCCScore Post(int id)
        {
            // TODO: Get user Id and submit it to the method in the db for the lookup
            return scoreManager.GetARCCScoreForProposal(9, id);      // TODO: Remove hardcoded id after authentication is working -----------//
        }
    }
}