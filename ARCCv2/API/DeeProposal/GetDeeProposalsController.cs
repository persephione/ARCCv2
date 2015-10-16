using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API.DeeProposal
{
    public class GetDeeProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets one dee proposal - tina
        /// </summary>
        /// <param name="id">unique primary key for proposal</param>
        /// <returns>dee proposal</returns>
        public DeeProposalDetail Get(int id)
        {
            var proposal = deeManager.GetDeeProposal(id);
            return CreateDeeProposalDetail(proposal);
        }

        /// <summary>
        /// Gets a list of Dee Proposals tied to a specific user - tina
        /// </summary>
        /// <param name="userName">unique user name</param>
        /// <returns></returns>
        public List<Models.DeeProposal> Post([FromBody] string userName) => deeManager.GetDeeProposals(userName);

        /// <summary>
        /// Creates a DeeProposalDetail object to return to the View - tina
        /// </summary>
        /// <param name="proposal">DeeProposalDetail POCO</param>
        /// <returns></returns>
        protected DeeProposalDetail CreateDeeProposalDetail(Models.DeeProposal proposal)
        {
            var tempProposalDetail = new DeeProposalDetail();

            tempProposalDetail.DeeProposal = proposal;
            tempProposalDetail.HardwareBudgetList = deeManager.GetHardwareBudgetsForProposal(proposal.DeeProposalID);
            tempProposalDetail.SoftwareBudgetList = deeManager.GetSoftwareBudgetsForProposal(proposal.DeeProposalID);
            tempProposalDetail.OtherBudgetList = deeManager.GetOtherBudgetsForProposal(proposal.DeeProposalID);

            return tempProposalDetail;
        }
    }
}