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
        public bool DoesProposalExist(int id) => Uow.ARCCProposalRepository.GetById(id) != null ? true : false;

        /// <summary>
        /// Checks if score exists in db - tina
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true or false</returns>
        public bool DoesScoreExist(int id) => Uow.ARCCScoreRepository.GetById(id) != null ? true : false;

        /// <summary>
        /// Checks if there's already a duplicate of the exact proposal in db using unique primary key - tina
        /// </summary>
        /// <param name="proposalName">name of proposal</param>
        /// <param name="directorName">director name</param>
        /// <returns>true or false</returns>
        public bool CheckForDuplicateProposal(string proposalName, string directorName) => 
            Uow.ARCCProposalRepository.GetAll()
            .Where(x => x.ARCCName == proposalName)
            .Where(x => x.ARCCDirector == directorName).Any();

        /// <summary>
        /// Gets all proposals created by a specific user - tina
        /// </summary>
        /// <param name="userName">unique user name to filter by</param>
        /// <returns>list of proposals</returns>
        public HashSet<ARCCProposal> GetAllProposalsForUser(string userName) => 
            Uow.ARCCProposalRepository.GetAll()
            .Where(x => x.ARCCUsername == userName).ToHashSet();

        /// <summary>
        /// Gets all scores associated with a proposal - tina
        /// </summary>
        /// <param name="proposalID">unique proposal id</param>
        /// <returns>list of arcc score records</returns>
        public HashSet<ARCCScore> GetAllScoresForProposal(int proposalID) => 
            Uow.ARCCScoreRepository.GetAll()
            .Where(x => x.ARCCProposalID == proposalID).ToHashSet();

        public HashSet<ARCCHardwareBudget> GetAllHardwareBudgetForProposal(int proposalID) => 
            Uow.ARCCHardwareBudgetRepository.GetAll()
            .Where(x => x.ARCCProposalID == proposalID).ToHashSet();

        public HashSet<ARCCSoftwareBudget> GetAllSoftwareBudgetForProposal(int proposalID) =>
            Uow.ARCCSoftwareBudgetRepository.GetAll()
            .Where(x => x.ARCCProposalID == proposalID).ToHashSet();

        public HashSet<ARCCOtherBudget> GetAllOtherBudgetForProposal(int proposalID) =>
            Uow.ARCCOtherBudgetRepository.GetAll()
            .Where(x => x.ARCCProposalID == proposalID).ToHashSet();


    }
}
