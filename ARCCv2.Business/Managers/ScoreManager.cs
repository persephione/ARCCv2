using ARCCv2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARCCv2.Business.Managers
{
    public class ScoreManager : BusinessBase
    {
        /// <summary>
        /// Gets all the scores associated with a proposal - tina
        /// </summary>
        /// <param name="proposalID">unique primary key for proposal</param>
        /// <returns>list of arcc score records</returns>
        public List<ARCCScore> GetARCCScoresForProposal(int proposalID)
        {
            // pull proposal from db
            var proposal = Uow.ARCCProposalRepository.GetById(proposalID);

            // if it's not found then return null, otherwise return the list
            return proposal != null ? arccQueries.GetAllScoresForProposal(proposalID).OrderBy(x => x.UserID).ToList() : null;
        }

        /// <summary>
        /// Updates an arcc score record - tina
        /// </summary>
        /// <param name="scoreID">unique score id</param>
        /// <returns></returns>
        public int UpdateARCCScore(ARCCScore arccScore)
        {
            // check if the record exists in db
            var scoreExists = arccQueries.DoesScoreExist(arccScore.ARCCScoreID);

            if (scoreExists)
            {
                Uow.ARCCScoreRepository.Update(arccScore);
                return Uow.SaveChanges();
            }
            else
                return 0;
        }
    }
}
