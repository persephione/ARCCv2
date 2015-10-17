﻿using ARCCv2.Data;
using ARCCv2.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace ARCCv2.Business.Managers
{
    public class ARCCManager : BusinessBase
    {
        /// <summary>
        /// Gets arcc proposals for specific user, or if userName is empty will get all of them. - tina
        /// </summary>
        /// <returns>list of arcc proposal records</returns>
        public List<ARCCProposal> GetARCCProposals(string userName = "")
        {
            if (userName.Length < 1)
                return Uow.ARCCProposalRepository.GetAll().ToList();
            else
                return arccQueries.GetAllProposalsForUser(userName)?.OrderBy(x => x.ARCCProposalID).ToList() ?? null;
        }

        /// <summary>
        /// Gets one arcc proposal by unique id - tina
        /// </summary>
        /// <param name="id">primary key</param>
        /// <returns>ARCCProposal object</returns>
        public ARCCProposal GetARCCProposal(int id) => Uow.ARCCProposalRepository.GetById(id);

        /// <summary>
        /// Saves new or existing arcc proposal record to db - tina
        /// </summary>
        /// <param name="arccProposal">arcc proposal to update or save</param>
        /// <returns>new primary key for proposal</returns>
        public int SaveOrUpdateARCCProposal(ARCCProposal arccProposal)  // TODO: Fix this after CAS is working ---------------//
        {
            // check if it's a new record or an existing one
            if(arccProposal.ARCCProposalID != 0)
            {
                // check if proposal exists in db
                var proposalExists = arccQueries.DoesProposalExist(arccProposal.ARCCProposalID);

                if (proposalExists)
                {
                    arccProposal.ARCCLastUpdatedDate = DateTime.Now;
                    //arccProposal.ARCCLastUpdatedBy = user;
                    arccProposal.ARCCLastUpdatedBy = "tina"; // remove this after testing            
                    Uow.ARCCProposalRepository.Update(arccProposal);
                }  
            }
            else
            {
                // check if there's a duplicate in db
                var duplicate = arccQueries.CheckForDuplicateProposal(arccProposal.ARCCName, arccProposal.ARCCDirector);

                if (!duplicate)
                {
                    arccProposal.ARCCLastUpdatedDate = DateTime.Now;
                    //arccProposal.ARCCLastUpdatedBy = user;
                    arccProposal.ARCCLastUpdatedBy = "tina"; // remove this after testing
                    Uow.ARCCProposalRepository.Add(arccProposal);
                }
            }
            var result = Uow.SaveChanges();

            return result > 0 ? arccProposal.ARCCProposalID : 0;
        }

        /// <summary>
        /// When a proposal is created, score records are created for each committee member - tina
        /// </summary>
        /// <param name="proposalID">unique primary key for proposal the records will be associated with</param>
        /// <returns>number of records saved to db</returns>
        public int CreateScoresForProposal(int proposalID)
        {
            // get all the active committee members
            var memberList = userQueries.GetAllActiveCommitteeMembers();

            foreach (var member in memberList)
                Uow.ARCCScoreRepository.Add(CreateScore(proposalID, member));

            return Uow.SaveChanges();
        }

        /// <summary>
        /// Helper method. Makes a new score record for a proposal and committee member. - tina
        /// </summary>
        /// <param name="proposalID">unique proposal id</param>
        /// <param name="user">committee member score is tied to</param>
        /// <returns>new ARCC Score recored</returns>
        protected ARCCScore CreateScore(int proposalID, User user)
        {
            var newScore = new ARCCScore();
            newScore.ARCCScoreEducExp = 0;
            newScore.ARCCScoreSupport = 0;
            newScore.ARCCScoreEvaluation = 0;
            newScore.ARCCScoreInnovation = 0;
            newScore.ARCCScoreDissemination = 0;
            newScore.ARCCScoreTotal = 0;
            newScore.UserID = user.UserID;
            newScore.ARCCProposalID = proposalID;
            newScore.ScoreLastUpdatedBy = user.UserFirstName + user.UserLastName;
            newScore.ScoreLastUpdatedDate = DateTime.Now;
            return newScore;
    }

        public List<ARCCHardwareBudget> GetHardwareBudgetsForProposal(int proposalID) => 
            arccQueries.GetAllHardwareBudgetForProposal(proposalID).ToList();

        public List<ARCCSoftwareBudget> GetSoftwareBudgetsForProposal(int proposalID) =>
            arccQueries.GetAllSoftwareBudgetForProposal(proposalID).ToList();

        public List<ARCCOtherBudget> GetOtherBudgetsForProposal(int proposalID) =>
            arccQueries.GetAllOtherBudgetForProposal(proposalID).ToList();

        public int SaveOrUpdateHardwareBudget(ARCCHardwareBudget hardwareBudget)
        {
            // check if it's new or existing
            if(hardwareBudget.ARCCHardwareBudgetID == 0)
                Uow.ARCCHardwareBudgetRepository.Add(hardwareBudget);
            else
                Uow.ARCCHardwareBudgetRepository.Update(hardwareBudget);
            return Uow.SaveChanges();
        }

        public int SaveOrUpdateSoftwareBudget(ARCCSoftwareBudget softwareBudget)
        {
            // check if it's new or existing
            if (softwareBudget.ARCCSoftwareBudgetID == 0)
                Uow.ARCCSoftwareBudgetRepository.Add(softwareBudget);
            else
                Uow.ARCCSoftwareBudgetRepository.Update(softwareBudget);
            return Uow.SaveChanges();
        }

        public int SaveOrUpdateOtherBudget(ARCCOtherBudget otherBudget)
        {
            // check if it's new or existing
            if (otherBudget.ARCCOtherBudgetID == 0)
                Uow.ARCCOtherBudgetRepository.Add(otherBudget);
            else
                Uow.ARCCOtherBudgetRepository.Update(otherBudget);
            return Uow.SaveChanges();
        }


    }
}
