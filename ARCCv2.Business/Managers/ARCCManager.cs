using ARCCv2.Data;
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
        /// Gets submitted arcc proposals for specific user, or if userName is empty will get all of them. - tina
        /// </summary>
        /// <returns>list of arcc proposal records</returns>
        public List<ARCCProposal> GetSubmittedARCCProposals() => Uow.ARCCProposalRepository.GetAll().Where(x => x.ARCCSubmitted == true).ToList();

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
                    //arccProposal.ARCCUsername = user; // remove this after testing 
                    arccProposal.ARCCUsername = "tina";
                    arccProposal.ARCCLastUpdatedDate = DateTime.Now;
                    //arccProposal.ARCCLastUpdatedBy = user;
                    arccProposal.ARCCLastUpdatedBy = "tina"; // remove this after testing
                    Uow.ARCCProposalRepository.Add(arccProposal);
                }
            }
            var result = Uow.SaveChanges();

            return result > 0 ? arccProposal.ARCCProposalID : 0;
        }

        public List<ARCCHardwareBudget> GetHardwareBudgetsForProposal(int proposalID) => 
            arccQueries.GetAllHardwareBudgetForProposal(proposalID).ToList();

        public List<ARCCSoftwareBudget> GetSoftwareBudgetsForProposal(int proposalID) =>
            arccQueries.GetAllSoftwareBudgetForProposal(proposalID).ToList();

        public List<ARCCOtherBudget> GetOtherBudgetsForProposal(int proposalID) =>
            arccQueries.GetAllOtherBudgetForProposal(proposalID).ToList();

        public int SaveOrUpdateHardwareBudget(ARCCHardwareBudget hardwareBudget)
        {
            hardwareBudget.ARCCHardwareLastUpdatedDate = DateTime.Now;
            //hardwareBudget.ARCCHardwareLastUpdatedBy = user;
            hardwareBudget.ARCCHardwareLastUpdatedBy = "tina"; // remove this after testing

            // check if it's new or existing
            if (hardwareBudget.ARCCHardwareBudgetID == 0)
                Uow.ARCCHardwareBudgetRepository.Add(hardwareBudget);
            else
                Uow.ARCCHardwareBudgetRepository.Update(hardwareBudget);

            return Uow.SaveChanges();
        }

        public int SaveOrUpdateSoftwareBudget(ARCCSoftwareBudget softwareBudget)
        {
            softwareBudget.ARCCSoftwareLastUpdatedDate = DateTime.Now;
            //softwareBudget.ARCCSoftwareLastUpdatedBy = user;
            softwareBudget.ARCCSoftwareLastUpdatedBy = "tina"; // remove this after testing

            // check if it's new or existing
            if (softwareBudget.ARCCSoftwareBudgetID == 0)
                Uow.ARCCSoftwareBudgetRepository.Add(softwareBudget);
            else
                Uow.ARCCSoftwareBudgetRepository.Update(softwareBudget);
            return Uow.SaveChanges();
        }

        public int SaveOrUpdateOtherBudget(ARCCOtherBudget otherBudget)
        {
            otherBudget.ARCCOtherLastUpdatedDate = DateTime.Now;
            //otherBudget.ARCCOtherLastUpdatedBy = user;
            otherBudget.ARCCOtherLastUpdatedBy = "tina"; // remove this after testing

            // check if it's new or existing
            if (otherBudget.ARCCOtherBudgetID == 0)
                Uow.ARCCOtherBudgetRepository.Add(otherBudget);
            else
                Uow.ARCCOtherBudgetRepository.Update(otherBudget);
            return Uow.SaveChanges();
        }


    }
}
