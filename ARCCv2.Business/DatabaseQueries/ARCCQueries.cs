using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARCCv2.Data;
using ARCCv2.Models;
using ARCCv2.Business.Helpers;

namespace ARCCv2.Business.DatabaseQueries
{
    public class ARCCQueries : BusinessBase
    {
        /// <summary>
        /// Checks if a proposal exists in db by comparing proposal name and director - tina
        /// </summary>
        /// <param name="id">unique primary key</param>
        /// <returns>true or false</returns>
        public bool DoesProposalExist(int id)
        {
            var existingRecord = Uow.ARCCProposalRepository.GetById(id);
            return existingRecord != null ? true : false;
        }

        /// <summary>
        /// Checks if there's already a duplicate of the exact proposal in db using unique primary key - tina
        /// </summary>
        /// <param name="proposalName">name of proposal</param>
        /// <param name="directorName">director name</param>
        /// <returns>true or false</returns>
        public bool CheckForDuplicateProposal(string proposalName, string directorName)
        {
            var duplicate = Uow.ARCCProposalRepository.GetAll()
                                .Where(x => x.ARCCName == proposalName)
                                .Where(x => x.ARCCDirector == directorName).FirstOrDefault();

            return duplicate != null ? true : false;
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

        /// <summary>
        /// Checks if score exists in db - tina
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true or false</returns>
        public bool DoesScoreExist(int id)
        {
            var existingRecord = Uow.ARCCScoreRepository.GetById(id);
            return existingRecord != null ? true : false;
        }
    }
}
