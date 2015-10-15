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

        protected List<ARCCv2.Models.ARCCProposal> GetAllARCCProposals() => arccManager.GetARCCProposals();


        protected List<ARCCv2.Models.DeeProposal> GetAllDeeProposals() => deeManager.GetDeeProposals();


        protected List<ProposalListView> CreateProposalListViews(List<ARCCv2.Models.ARCCProposal> arccProposals, 
                                                                        List<ARCCv2.Models.DeeProposal> deeProposals)
        {
            var allProposals = new List<ProposalListView>();
            if (arccProposals != null)
            {
                foreach (var arcc in arccProposals)
                {
                    var newViewProposal = new ProposalListView();
                    newViewProposal.ProposalID = arcc.ARCCProposalID;
                    newViewProposal.ProposalName = arcc.ARCCName;
                    newViewProposal.LastUpdatedDate = arcc.ARCCLastUpdatedDate;
                    newViewProposal.Type = "ARCC";
                    newViewProposal.Status = arcc.ARCCApproval ? proposalStatus.isFalse : proposalStatus.isTrue;
                    allProposals.Add(newViewProposal);
                }
           }


            if(deeProposals != null)
            {
                foreach (var dee in deeProposals)
                {
                    var newViewProposal = new ProposalListView();
                    newViewProposal.ProposalID = dee.DeeProposalID;
                    newViewProposal.ProposalName = dee.DeeName;
                    newViewProposal.LastUpdatedDate = dee.DeeLastUpdatedDate;
                    newViewProposal.Type = "Dee";
                    newViewProposal.Status = dee.DeeApproval ? proposalStatus.isTrue : proposalStatus.isFalse;
                    allProposals.Add(newViewProposal);
                }
            }

            return allProposals;
        }
    }
}