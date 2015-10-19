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
        /// Saves a new or edits an existing arcc score record - tina
        /// </summary>
        /// <param name="scoreID">unique score id</param>
        /// <param name="user">user editing or saving object</param>
        /// <returns>Number of records saved in db</returns>
        public int SaveOrUpdateARCCScore(ARCCScore arccScore, User user)
        {
            // check if it's a new or existing record
            if (arccScore.ARCCScoreID == 0)
            {
                arccScore.UserID = user.UserID;
                arccScore.ScoreLastUpdatedBy = user.UserFirstName + user.UserLastName;
                arccScore.ScoreLastUpdatedDate = DateTime.Now;
                Uow.ARCCScoreRepository.Add(arccScore);
            }
            else
            {
                // check if the record exists in db
                var scoreExists = arccQueries.DoesScoreExist(arccScore.ARCCScoreID);
                if (scoreExists)
                {

                    arccScore.ScoreLastUpdatedBy = user.UserFirstName + user.UserLastName;
                    arccScore.ScoreLastUpdatedDate = DateTime.Now;
                    Uow.ARCCScoreRepository.Update(arccScore);
                }
                else
                    return 0;
            }
            return Uow.SaveChanges();
        }

        /// <summary>
        /// Gets all the scores associated with a proposal - tina
        /// </summary>
        /// <param name="proposalID">unique primary key for proposal</param>
        /// <returns>list of arcc score records</returns>
        public List<DeeScore> GetDeeScoresForProposal(int proposalID)
        {
            // pull proposal from db
            var proposal = Uow.DeeProposalRepository.GetById(proposalID);

            // if it's not found then return null, otherwise return the list
            return proposal != null ? deeQueries.GetAllScoresForProposal(proposalID).OrderBy(x => x.UserID).ToList() : null;
        }

        /// <summary>
        /// Saves a new or edits an existing dee score record - tina
        /// </summary>
        /// <param name="scoreID">unique score id</param>
        /// <param name="user">user editing or saving object</param>
        /// <returns>Number of records saved in db</returns>  
        public int SaveOrUpdateDeeScore(DeeScore deeScore, User user)
        {
            // check if it's a new or existing record
            if (deeScore.DeeScoreID == 0)
            {
                deeScore.UserID = user.UserID;
                deeScore.ScoreLastUpdatedBy = user.UserFirstName + user.UserLastName;
                deeScore.ScoreLastUpdatedDate = DateTime.Now;
                Uow.DeeScoreRepository.Add(deeScore);
            }
            else
            {
                // check if the record exists in db
                var scoreExists = arccQueries.DoesScoreExist(deeScore.DeeScoreID);
                if (scoreExists)
                {
                    deeScore.ScoreLastUpdatedBy = user.UserFirstName + user.UserLastName;
                    deeScore.ScoreLastUpdatedDate = DateTime.Now;
                    Uow.DeeScoreRepository.Update(deeScore);
                }
                else
                    return 0;
            }
            return Uow.SaveChanges();
        }
    }
}
