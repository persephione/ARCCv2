using ARCCv2.POCO;
using System.Collections.Generic;

namespace ARCCv2.API.Scores
{
    public class GetProposalsController : ARCCApiController
    {
        public List<ProposalListView> Get()
        {
            var arccProposals = GetAllARCCProposals();
            var deeProposals = GetAllDeeProposals();

            return CreateProposalListViews(arccProposals, deeProposals);
        }

        protected List<Models.ARCCProposal> GetAllARCCProposals() => arccManager.GetARCCProposals();

        protected List<Models.DeeProposal> GetAllDeeProposals() => deeManager.GetDeeProposals();
    }
}