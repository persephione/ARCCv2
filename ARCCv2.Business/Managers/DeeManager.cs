using ARCCv2.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ARCCv2.Business.Managers
{
    public class DeeManager : BusinessBase
    {
        public List<DeeProposal> GetDeeProposals(string userName = "") =>
            userName.Length < 1 ? Uow.DeeProposalRepository.GetAll().ToList() :
            deeQueries.GetAllProposalsForUser(userName)?.OrderBy(x => x.DeeProposalID).ToList() ?? null;

        /// <summary>
        /// Saves new or existing dee proposal record to db - tina
        /// </summary>
        /// <param name="deeProposal">dee proposal to update or save</param>
        /// <returns>proposal id</returns>
        public int SaveOrUpdateDeeProposal(DeeProposal deeProposal)  // TODO: Fix this after CAS is working ---------------//
        {
            // check if it's a new record or an existing one
            if (deeProposal.DeeProposalID != 0)
            {
                // check if proposal exists in db
                var proposalExists = arccQueries.DoesProposalExist(deeProposal.DeeProposalID);

                if (proposalExists)
                {
                    deeProposal.DeeLastUpdatedDate = DateTime.Now;
                    //deeProposal.ARCCLastUpdatedBy = user;
                    deeProposal.DeeLastUpdatedBy = "tina"; // remove this after testing            
                    Uow.DeeProposalRepository.Update(deeProposal);
                }
            }
            else
            {
                // check if there's a duplicate in db
                var duplicate = deeQueries.CheckForDuplicateProposal(deeProposal.DeeName, deeProposal.DeeDirector);

                if (!duplicate)
                {
                    deeProposal.DeeLastUpdatedDate = DateTime.Now;
                    //deeProposal.DeeLastUpdatedBy = user;
                    deeProposal.DeeLastUpdatedBy = "tina"; // remove this after testing
                    Uow.DeeProposalRepository.Add(deeProposal);
                }
            }
            var result = Uow.SaveChanges();

            return result > 0 ? deeProposal.DeeProposalID : 0;
        }

        public DeeProposal GetDeeProposal(int id) => Uow.DeeProposalRepository.GetById(id);

        public List<DeeHardwareBudget> GetHardwareBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllHardwareBudgetForProposal(proposalID).ToList();

        public List<DeeSoftwareBudget> GetSoftwareBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllSoftwareBudgetForProposal(proposalID).ToList();

        public List<DeeOtherBudget> GetOtherBudgetsForProposal(int proposalID) =>
            deeQueries.GetAllOtherBudgetForProposal(proposalID).ToList();


        public int SaveOrUpdateHardwareBudget(DeeHardwareBudget hardwareBudget)
        {
            // check if it's new or existing
            if (hardwareBudget.DeeHardwareBudgetID == 0)
                Uow.DeeHardwareBudgetRepository.Add(hardwareBudget);
            else
                Uow.DeeHardwareBudgetRepository.Update(hardwareBudget);
            return Uow.SaveChanges();
        }

        public int SaveOrUpdateSoftwareBudget(DeeSoftwareBudget softwareBudget)
        {
            // check if it's new or existing
            if (softwareBudget.DeeSoftwareBudgetID == 0)
                Uow.DeeSoftwareBudgetRepository.Add(softwareBudget);
            else
                Uow.DeeSoftwareBudgetRepository.Update(softwareBudget);
            return Uow.SaveChanges();
        }

        public int SaveOrUpdateOtherBudget(DeeOtherBudget otherBudget)
        {
            // check if it's new or existing
            if (otherBudget.DeeOtherBudgetID == 0)
                Uow.DeeOtherBudgetRepository.Add(otherBudget);
            else
                Uow.DeeOtherBudgetRepository.Update(otherBudget);
            return Uow.SaveChanges();
        }
    }
}
