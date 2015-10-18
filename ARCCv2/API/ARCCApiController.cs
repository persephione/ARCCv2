using ARCCv2.Business.Managers;
using ARCCv2.POCO;
using System.Collections.Generic;
using System.Web.Http;

namespace ARCCv2.API
{
    public class ARCCApiController : ApiController
    {
        private ARCCManager _arccManager;
        private DeeManager _deeManager;
        private ScoreManager _scoreManager;
        private UserManager _userManager;
        private ProposalStatus _proposalStatus;

        public ARCCManager arccManager => _arccManager ?? (_arccManager = new ARCCManager());
        public DeeManager deeManager => _deeManager ?? (_deeManager = new DeeManager());
        public ScoreManager scoreManager => _scoreManager ?? (_scoreManager = new ScoreManager());
        public UserManager userManager => _userManager ?? (_userManager = new UserManager());
        public ProposalStatus proposalStatus => _proposalStatus ?? (_proposalStatus = new ProposalStatus());


        protected List<ProposalListView> CreateProposalListViews(List<Models.ARCCProposal> arccProposals = null,
                                                        List<ARCCv2.Models.DeeProposal> deeProposals = null)
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


            if (deeProposals != null)
            {
                foreach (var dee in deeProposals)
                {
                    var newViewProposal = new ProposalListView();
                    newViewProposal.ProposalID = dee.DeeProposalID;
                    newViewProposal.ProposalName = dee.DeeName;
                    newViewProposal.LastUpdatedDate = dee.DeeLastUpdatedDate;
                    newViewProposal.Type = "Dee";
                    newViewProposal.Status = dee.DeeApproval ? proposalStatus.isFalse : proposalStatus.isTrue;
                    allProposals.Add(newViewProposal);
                }
            }

            return allProposals;
        }
    }
}