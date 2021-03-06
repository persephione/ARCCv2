﻿using ARCCv2.Business.Helpers;
using ARCCv2.Models;
using System.Collections.Generic;
using System.Linq;
using ARCCv2.Data;

namespace ARCCv2.Business.DatabaseQueries
{
    public class DeeQueries : BusinessBase
    {
        /// <summary>
        /// Checks if a proposal exists in db by comparing proposal name and director - tina
        /// </summary>
        /// <param name="id">unique primary key</param>
        /// <returns>true or false</returns>
        public bool DoesProposalExist(int id) => Uow.DeeProposalRepository.GetById(id) != null ? true : false;

        /// <summary>
        /// Checks if score exists in db - tina
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true or false</returns>
        public bool DoesScoreExist(int id) => Uow.DeeScoreRepository.GetById(id) != null ? true : false;

        /// <summary>
        /// Checks if there's already a duplicate of the exact proposal in db using unique primary key - tina
        /// </summary>
        /// <param name="proposalName">name of proposal</param>
        /// <param name="directorName">director name</param>
        /// <returns>true or false</returns>
        public bool CheckForDuplicateProposal(string proposalName, string directorName) =>
            Uow.DeeProposalRepository.GetAll()
            .Where(x => x.DeeName == proposalName)
            .Where(x => x.DeeDirector == directorName).Any();

        public HashSet<DeeProposal> GetAllProposalsForUser(string userName) =>
            Uow.DeeProposalRepository.GetAll()
            .Where(x => x.DeeUsername == userName).ToHashSet();

        public HashSet<DeeHardwareBudget> GetAllHardwareBudgetForProposal(int proposalID) =>
            Uow.DeeHardwareBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

        public HashSet<DeeSoftwareBudget> GetAllSoftwareBudgetForProposal(int proposalID) =>
            Uow.DeeSoftwareBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

        public HashSet<DeeOtherBudget> GetAllOtherBudgetForProposal(int proposalID) =>
            Uow.DeeOtherBudgetRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

        /// <summary>
        /// Gets all scores associated with a proposal - tina
        /// </summary>
        /// <param name="proposalID">unique proposal id</param>
        /// <returns>list of dee score records</returns>
        public HashSet<DeeScore> GetAllScoresForProposal(int proposalID) => 
            Uow.DeeScoreRepository.GetAll()
            .Where(x => x.DeeProposalID == proposalID).ToHashSet();

    }
}
