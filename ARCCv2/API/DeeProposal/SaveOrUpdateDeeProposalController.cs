using ARCCv2.Models;
using ARCCv2.POCO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ARCCv2.API.ARCCProposal
{
    public class SaveOrUpdateDeeProposalController : ARCCApiController
    {
        /// <summary>
        /// Saves new or updates existing dee proposal. - tina
        /// </summary>
        /// <param name="deeProposal">dee proposal object</param>
        /// <returns>The proposal id</returns>
        public int Post([FromBody] DeeProposalDetail deeProposal)
        {
            // save the proposal first
            var proposalID = deeManager.SaveOrUpdateDeeProposal(deeProposal.DeeProposal);

            // save each budget list
            SaveHardwareBudget(deeProposal.HardwareBudgetList, proposalID);
            SaveSoftwareBudget(deeProposal.SoftwareBudgetList, proposalID);
            SaveOtherBudget(deeProposal.OtherBudgetList, proposalID);
            return proposalID;
        }

        protected void SaveHardwareBudget(List<DeeHardwareBudget> hardwareBudgetList, int proposalID)
        {
            if (hardwareBudgetList != null)
                foreach (var hardware in hardwareBudgetList)
                {
                    hardware.DeeProposalID = proposalID;
                    deeManager.SaveOrUpdateHardwareBudget(hardware);
                }
        }

        protected void SaveSoftwareBudget(List<DeeSoftwareBudget> softwareBudgetList, int proposalID)
        {
            if (softwareBudgetList != null)
                foreach (var software in softwareBudgetList)
                {
                    software.DeeProposalID = proposalID;
                    deeManager.SaveOrUpdateSoftwareBudget(software);
                }
        }

        protected void SaveOtherBudget(List<DeeOtherBudget> otherBudgetList, int proposalID)
        {
            if (otherBudgetList != null)
                foreach (var other in otherBudgetList)
                {
                    other.DeeProposalID = proposalID;
                    deeManager.SaveOrUpdateOtherBudget(other);
                }
        }
    }
}