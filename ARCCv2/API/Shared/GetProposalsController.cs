using ARCCv2.POCO;
using System.Collections.Generic;

namespace ARCCv2.API.Scores
{
    public class GetProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets the proposals for the User Dashboard
        /// </summary>
        /// <returns></returns>
        public List<ProposalListView> Get()
        {
            var arccProposals = GetAllARCCProposals();
            var deeProposals = GetAllDeeProposals();

            return CreateProposalListViewsForUserDashboard(arccProposals, deeProposals);
        }

        protected List<Models.ARCCProposal> GetAllARCCProposals() => arccManager.GetARCCProposals();

        protected List<Models.DeeProposal> GetAllDeeProposals() => deeManager.GetDeeProposals();
    }
}