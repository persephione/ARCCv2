using ARCCv2.Models;
using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API
{
    public class SaveOrUpdateARCCProposalController : ARCCApiController
    {
        /// <summary>
        /// Saves new or updates existing arcc proposal. - tina
        /// </summary>
        /// <param name="arccProposal">arcc proposal object</param>
        /// <returns>The new proposal id</returns>
        public int Post([FromBody] ARCCProposalDetail  arccProposal)
        {
            // save the proposal first
            var proposalID = arccManager.SaveOrUpdateARCCProposal(arccProposal.ARCCProposal);

            // save each budget list
            SaveHardwareBudget(arccProposal.HardwareBudgetList, proposalID);
            SaveSoftwareBudget(arccProposal.SoftwareBudgetList, proposalID);
            SaveOtherBudget(arccProposal.OtherBudgetList, proposalID);
            return proposalID;
        }

        protected void SaveHardwareBudget(List<ARCCHardwareBudget> hardwareBudgetList, int proposalID)
        {
            if (hardwareBudgetList != null)
                foreach (var hardware in hardwareBudgetList)
                {
                    hardware.ARCCProposalID = proposalID;
                    arccManager.SaveOrUpdateHardwareBudget(hardware);
                }
        }

        protected void SaveSoftwareBudget(List<ARCCSoftwareBudget> softwareBudgetList, int proposalID)
        {
            if (softwareBudgetList != null)
                foreach (var software in softwareBudgetList)
                {
                    software.ARCCProposalID = proposalID;
                    arccManager.SaveOrUpdateSoftwareBudget(software);
                }
        }

        protected void SaveOtherBudget(List<ARCCOtherBudget> otherBudgetList, int proposalID)
        {
            if (otherBudgetList != null)
                foreach (var other in otherBudgetList)
                {
                    other.ARCCProposalID = proposalID;
                    arccManager.SaveOrUpdateOtherBudget(other);
                }
        }
    }
}