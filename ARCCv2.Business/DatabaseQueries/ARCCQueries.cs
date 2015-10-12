using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARCCv2.Data;
using ARCCv2.Models;

namespace ARCCv2.Business.DatabaseQueries
{
    public class ARCCQueries : BusinessBase
    {
        /// <summary>
        /// Checks if a proposal exists in db by comparing proposal name and director - tina
        /// </summary>
        /// <param name="proposalName">name of proposal</param>
        /// <param name="directorName">director name</param>
        /// <returns>true or false</returns>
        public bool DoesProposalExist(int proposalID)
        {
            var duplicate = Uow.ARCCProposalRepository.GetById(proposalID);
            return duplicate != null ? true : false;
        }

        /// <summary>
        /// Checks if there's already a duplicate of the exact proposal in db using unique primary key - tina
        /// </summary>
        /// <param name="proposalID">unique primary key</param>
        /// <returns></returns>
        public bool CheckForDuplicateProposal(string proposalName, string directorName)
        {
            var existingRecord = Uow.ARCCProposalRepository.GetAll()
                                .Where(x => x.ARCCName == proposalName)
                                .Where(x => x.ARCCDirector == directorName).FirstOrDefault();

            return existingRecord != null ? true : false;
        }

        /// <summary>
        /// Gets all scores associated with a proposal - tina
        /// </summary>
        /// <param name="proposalID">unique proposal id</param>
        /// <returns>list of arcc score records</returns>
        public HashSet<ARCCScore> GetAllScoresForProposal(int proposalID)
        {
            return Uow.ARCCScoreRepository.GetAll()
                .Where(x => x.ARCCProposalID == proposalID).ToHashSet();
        }
    }
}
