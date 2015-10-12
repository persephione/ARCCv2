﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARCCv2.Models;

namespace ARCCv2.Business.Managers
{
    public class ARCCManager : BusinessBase
    {
        /// <summary>
        /// Gets all the arcc proposals -  tina
        /// </summary>
        /// <returns>list of arcc proposal records</returns>
        public List<ARCCProposal> GetARCCProposals() => Uow.ARCCProposalRepository.GetAll().ToList();

        /// <summary>
        /// Saves new or existing arcc proposal record to db - tina
        /// </summary>
        /// <param name="arccProposal">arcc proposal to update or save</param>
        /// <returns>number of records saved in db</returns>
        public int SaveOrUpdateARCCProposal(ARCCProposal arccProposal)
        {
            // check if it's a new record or an existing one
            if(arccProposal.ARCCProposalID != 0)
            {
                // check if proposal exists in db
                var proposalExists = arccQueries.DoesProposalExist(arccProposal.ARCCProposalID);

                if (proposalExists != false)
                    Uow.ARCCProposalRepository.Update(arccProposal);    
            }
            else
            {
                // check if there's a duplicate in db
                var duplicate = arccQueries.CheckForDuplicateProposal(arccProposal.ARCCName, arccProposal.ARCCDirector);

                if (duplicate != true)
                    Uow.ARCCProposalRepository.Add(arccProposal);
            }
            return Uow.SaveChanges();
        }

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
        /// When a proposal is created, score records are created for each committee member - tina
        /// </summary>
        /// <param name="proposalID">unique primary key for proposal the records will be associated with</param>
        /// <returns>number of records saved to db</returns>
        public int CreateScoresForProposal(int proposalID)
        {
            // get all the active committee members
            var userList = userQueries.GetAllActiveCommitteeMembers();

            foreach (var user in userList)
                Uow.ARCCScoreRepository.Add(CreateScore(proposalID, user));

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
            newScore.UserID = user.UserFirstName + " " + user.UserLastName;
            newScore.ARCCProposalID = proposalID;
            //newScore.ScoreLastUpdatedBy =                     // TODO: Figure this out later -----------------//
            newScore.ScoreLastUpdatedDate = DateTime.Now;
            return newScore;
    }

        /// <summary>
        /// Updates an arcc score record - tina
        /// </summary>
        /// <param name="scoreID">unique score id</param>
        /// <returns></returns>
        public int UpdateARCCScore(ARCCScore arccScore)
        {
            // check the record exists in db
            var scoreExists = arccQueries.DoesScoreExist(arccScore.ARCCScoreID);

            if (scoreExists != false)
                Uow.ARCCScoreRepository.Update(arccScore);

            return Uow.SaveChanges();
        }
    }

}
