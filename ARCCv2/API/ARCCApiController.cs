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
        private LookupManager _lookupManager;
        private Dictionary<int, string> _statusNames;

        public ARCCManager arccManager => _arccManager ?? (_arccManager = new ARCCManager());
        public DeeManager deeManager => _deeManager ?? (_deeManager = new DeeManager());
        public ScoreManager scoreManager => _scoreManager ?? (_scoreManager = new ScoreManager());
        public UserManager userManager => _userManager ?? (_userManager = new UserManager());
        public LookupManager lookupManager => _lookupManager ?? (_lookupManager = new LookupManager());


        protected List<ProposalListView> CreateProposalListViewsForScoring(HashSet<Models.ARCCProposal> arccProposals = null,
                                                        HashSet<Models.DeeProposal> deeProposals = null)
        {
            // get all the statuses
            _statusNames = lookupManager.GetStatusNames();

            var allProposals = new List<ProposalListView>();


            if (arccProposals != null)
            {
                foreach (var arcc in arccProposals)
                {
                    var status = (_statusNames.ContainsKey(arcc.Status))
                        ? _statusNames[arcc.Status]
                        : string.Empty;

                    allProposals.Add(new ProposalListView()
                    {
                        ProposalID = arcc.ARCCProposalID,
                        ProposalName = arcc.ARCCName,
                        LastUpdatedDate = arcc.ARCCLastUpdatedDate,
                        Type = arcc.Type,
                        Status = status
                    }); 
                }
            }

            if (deeProposals != null)
            {
                foreach (var dee in deeProposals)
                {
                    var status = (_statusNames.ContainsKey(dee.Status))
                        ? _statusNames[dee.Status]
                        : string.Empty;

                    allProposals.Add(new ProposalListView()
                    { 
                        ProposalID = dee.DeeProposalID,
                        ProposalName = dee.DeeName,
                        LastUpdatedDate = dee.DeeLastUpdatedDate,
                        Type = dee.Type,
                        Status = status
                    });
                }
            }

            return allProposals;
        }

        protected List<ProposalListView> CreateProposalListViewsForUserDashboard(List<Models.ARCCProposal> arccProposals = null,
                                                        List<Models.DeeProposal> deeProposals = null)
        {
            // get all the statuses
            _statusNames = lookupManager.GetStatusNames();

            var allProposals = new List<ProposalListView>();
            if (arccProposals != null)
            {
                foreach (var arcc in arccProposals)
                {
                    var status = (_statusNames.ContainsKey(arcc.Status))
                        ? _statusNames[arcc.Status]
                        : string.Empty;

                    var newViewProposal = new ProposalListView
                    {
                        ProposalID = arcc.ARCCProposalID,
                        ProposalName = arcc.ARCCName,
                        LastUpdatedDate = arcc.ARCCLastUpdatedDate,
                        Type = arcc.Type,
                        Status = status
                    };

                    allProposals.Add(newViewProposal);
                }
            }

            if (deeProposals != null)
            {
                foreach (var dee in deeProposals)
                {
                    var status = (_statusNames.ContainsKey(dee.Status))
                        ? _statusNames[dee.Status]
                        : string.Empty;

                    var newViewProposal = new ProposalListView
                    {
                        ProposalID = dee.DeeProposalID,
                        ProposalName = dee.DeeName,
                        LastUpdatedDate = dee.DeeLastUpdatedDate,
                        Type = dee.Type,
                        Status = status
                    };

                    allProposals.Add(newViewProposal);
                }
            }
            return allProposals;
        }
    }
}