using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API
{
    public class GetARCCProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets a list of all ARCC Proposals - tina
        /// </summary>
        /// <returns></returns>
        //public List<ProposalListView> Get()
        //{
        //    var arccProposals = arccManager.GetARCCProposals();
        //    return CreateProposalListViews(arccProposals);
        //}

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


        protected ARCCProposalDetail CreateARCCProposalDetail(Models.ARCCProposal proposal)
        {
            var tempProposalDetail = new ARCCProposalDetail();

            tempProposalDetail.ARCCProposal = proposal;
            tempProposalDetail.HardwareBudgetList = arccManager.GetHardwareBudgetsForProposal(proposal.ARCCProposalID);
            tempProposalDetail.SoftwareBudgetList = arccManager.GetSoftwareBudgetsForProposal(proposal.ARCCProposalID);
            tempProposalDetail.OtherBudgetList = arccManager.GetOtherBudgetsForProposal(proposal.ARCCProposalID);

            return tempProposalDetail;
        }

    }
}