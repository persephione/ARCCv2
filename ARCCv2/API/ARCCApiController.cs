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


        protected List<ProposalListView> CreateProposalListViewsForScoring(List<Models.ARCCProposal> arccProposals = null,
                                                        List<Models.DeeProposal> deeProposals = null)
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

        protected List<ProposalListView> CreateProposalListViewsForUserDashboard(List<Models.ARCCProposal> arccProposals = null,
                                                        List<Models.DeeProposal> deeProposals = null)
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

                    if (arcc.ARCCSubmitted == false)
                        newViewProposal.Status = proposalStatus.notSubmitted;
                    else if (arcc.ARCCSubmitted == true && arcc.ARCCScored == false)
                        newViewProposal.Status = proposalStatus.submitted;
                    else if (arcc.ARCCScored == true && arcc.ARCCApproval == true)
                        newViewProposal.Status = proposalStatus.approved;
                    else if (arcc.ARCCScored == true && arcc.ARCCApproval == false)
                        newViewProposal.Status = proposalStatus.notApproved;

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

                    if (dee.DeeSubmitted == false)
                        newViewProposal.Status = proposalStatus.notSubmitted;
                    else if (dee.DeeSubmitted == true && dee.DeeScored == false)
                        newViewProposal.Status = proposalStatus.submitted;
                    else if (dee.DeeScored == true && dee.DeeApproval == true)
                        newViewProposal.Status = proposalStatus.approved;
                    else if (dee.DeeScored == true && dee.DeeApproval == false)
                        newViewProposal.Status = proposalStatus.notApproved;

                    allProposals.Add(newViewProposal);
                }
            }

            return allProposals;
        }
    }
}