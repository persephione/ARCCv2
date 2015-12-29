using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API
{
    public class GetARCCProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets one entire arcc proposal with all details including budget - tina
        /// </summary>
        /// <param name="id">unique primary key for proposal</param>
        /// <returns>arcc proposal</returns>
        public ARCCProposalDetail Get(int id)
        {
            var proposal = arccManager.GetARCCProposal(id);
            return CreateARCCProposalDetail(proposal);
        }

        /// <summary>
        /// Gets a list of ARCC proposals tied to a specific user - tina
        /// </summary>
        /// <param name="userName">unique user name</param>
        /// <returns></returns>
        public List<Models.ARCCProposal> Post([FromBody] string userName) => arccManager.GetARCCProposals(userName);

        /// <summary>
        /// Creates the POCO to return to the view that contains all of a proposal's detail - tina
        /// </summary>
        /// <param name="proposal">arcc proposal object</param>
        /// <returns>ARCCProposalDetailPOCO</returns>
        protected ARCCProposalDetail CreateARCCProposalDetail(Models.ARCCProposal proposal)
        {
            var tempProposalDetail = new ARCCProposalDetail
            {
                ARCCProposal = proposal,
                HardwareBudgetList = arccManager.GetHardwareBudgetsForProposal(proposal.ARCCProposalID),
                SoftwareBudgetList = arccManager.GetSoftwareBudgetsForProposal(proposal.ARCCProposalID),
                OtherBudgetList = arccManager.GetOtherBudgetsForProposal(proposal.ARCCProposalID)
            };
            return tempProposalDetail;
        }

    }
}