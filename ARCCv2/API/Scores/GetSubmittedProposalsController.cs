using ARCCv2.POCO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARCCv2.API.Scores
{
    public class GetSubmittedProposalsController : ARCCApiController
    {
        /// <summary>
        /// Gets all submitted proposals for the ARCCProposalToScore View - tina
        /// </summary>
        /// <returns>List of ProposalListView objects</returns>
        public List<ProposalListView> Get()
        {
            var arccProposals = GetSubmittedARCCProposals();
            var deeProposals = GetSubmittedDeeProposals();

            return CreateProposalListViewsForScoring(arccProposals, deeProposals);
        }

        protected List<Models.ARCCProposal> GetSubmittedARCCProposals() => arccManager.GetSubmittedARCCProposals();

        protected List<Models.DeeProposal> GetSubmittedDeeProposals() => deeManager.GetSubmittedDeeProposals();
    }
}